import { useState, useEffect } from "react";
import loginService from "../services/login-service";

const LoginForm = ({ user, onUserChange, onMessageChange }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else {
      setPassword(value);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      onUserChange(user);
    }
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const user = await loginService.login({
        username: userName,
        password,
      });
      onUserChange(user);
      onMessageChange(`Successfully Logged in`);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      window.localStorage.setItem("loggedBlogAppUserToken", user.token);
      setUserName("");
      setPassword("");
    } catch (error) {
      onMessageChange("error Not Able to login!");
    }
  };

  return (
    <>
      <h1>Login into the application</h1>
      <form onSubmit={submitHandler}>
        <fieldset style={{ padding: "5px", margin: "2px" }}>
          <legend>Login Form</legend>
          Username :
          <label htmlFor="username" style={{ paddingBottom: "4px" }}>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={handleChange}
            />
          </label>
          <br />
          Password :
          <label htmlFor="password" style={{ paddingBottom: "4px" }}>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" id="loginBtn">
            Login
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default LoginForm;

import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs-service";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleUserChange = (user) => {
    setUser(user);
  };

  const handleMessageChange = (message) => {
    setMessage(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      setBlogs(await blogService.getAll());
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  console.table(blogs);
  return (
    <div>
      <h1 style={{ color: "green", fontWeight: "bold", margin: "4px" }}>
        Blog Application
      </h1>
      {user === null ? (
        <>
          {message && <Notification message={message} />}
          <Toggleable buttonLabel="login">
            <LoginForm
              user={user}
              onUserChange={handleUserChange}
              onMessageChange={handleMessageChange}
            />
          </Toggleable>
        </>
      ) : (
        <>
          {message && <Notification message={message} />}
          <h2>{user.name} logged in</h2>
          <Blogs
            blogs={blogs}
            user={user}
            onMessageChange={handleMessageChange}
          />
          <button
            style={{ margin: "5px" }}
            onClick={() => {
              window.localStorage.clear();
              handleUserChange(null);
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default App;

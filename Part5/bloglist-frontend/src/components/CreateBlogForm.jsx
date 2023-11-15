import { useState } from "react";
import blogService from "../services/blogs-service";

const CreateBlogForm = ({ user, onMessageChange }) => {
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    author: "",
    url: "",
    userId: `${user.id}`,
  });

  const userToken = window.localStorage.getItem("loggedBlogAppUserToken");

  const handleChange = (e) => {
    e.preventDefault();
    setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      console.log(blogDetails);
      await blogService.createBlog(blogDetails, userToken);
      onMessageChange(
        `a new blog ${blogDetails.title} by ${blogDetails.author} added successfully`
      );
    } catch (error) {
      onMessageChange(`error ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h1>Create new blog</h1>
      <form
        onSubmit={submitHandler}
        style={{
          padding: 4,
          margin: 2,
        }}
      >
        <fieldset
          style={{
            padding: 4,
          }}
        >
          <legend>Blog details</legend>
          <label htmlFor="title">
            Blog Title :
            <input
              type="text"
              name="title"
              id="title"
              required
              value={blogDetails.title}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="author">
            Blog Author :
            <input
              type="text"
              name="author"
              id="author"
              required
              value={blogDetails.author}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="url">
            Blog Url :
            <input
              type="text"
              name="url"
              id="url"
              required
              value={blogDetails.url}
              onChange={handleChange}
            />
          </label>
          <br />
          <button
            type="submit"
            id="submitBtn"
            style={{
              marginTop: 5,
            }}
          >
            Create
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateBlogForm;

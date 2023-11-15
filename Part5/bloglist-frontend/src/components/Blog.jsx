import { useEffect, useState } from "react";
import blogService from "../services/blogs-service";

const Blog = ({ blog, onMessageChange, userToken }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [isDeleted, setIsDeleted] = useState(false);
  const [hide, setHide] = useState(true);
  const isHidden = { display: hide ? "none" : "" };
  // const isShown = { display: hide ? "" : "none" };

  // console.log(blog);

  useEffect(() => {}, [likes, isDeleted]);

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      const updated = await blogService.updateBlogLikes(updatedBlog);
      onMessageChange("Blog updated successfully");
      setLikes(blog.likes++);
      console.log(updated);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author} ?`)) {
      try {
        const deleted = await blogService.deleteBlog(blog, userToken);
        console.log(deleted);
        onMessageChange(
          `Blog ${blog.title} by ${blog.author} deleted successfully`
        );
        setIsDeleted(true);
        // console.log(blog.id);
      } catch (error) {
        onMessageChange(`error ${error.message}`);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blog">
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        <p>Blog Title : {blog.title}</p>
        <button
          onClick={() => {
            setHide(!hide);
          }}
        >
          {hide ? "View" : "Hide"}
        </button>
      </div>
      <p>Blog Author : {blog.author}</p>
      <div style={isHidden} className="toggleable-blog">
        <p>Blog URL : {blog.url}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <p id="likes">Blog Likes : {blog.likes}</p>
          <button id="likeBtn" onClick={() => handleLike(blog)}>
            Like
          </button>
        </div>
        <p>Added By : {blog.user.name}</p>
        <button
          onClick={() => {
            handleDelete(blog);
          }}
          id="deleteBtn"
        >
          Delete Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;

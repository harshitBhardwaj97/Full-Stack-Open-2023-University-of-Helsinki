import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

const getAll = async () => {
  const blogs = await axios.get(baseUrl);
  return await blogs.data;
};

const createBlog = async (blog, token) => {
  const createdBlog = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await createdBlog.data;
};

const updateBlogLikes = async (blog) => {
  const updatedBlog = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return await updatedBlog.data;
};

const deleteBlog = async (blog, token) => {
  const deletedBlog = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await deletedBlog.data;
};

export default { getAll, createBlog, updateBlogLikes, deleteBlog };

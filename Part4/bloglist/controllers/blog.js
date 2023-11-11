const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.status(200).json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;

  const foundBlog = await Blog.findById(id);

  if (foundBlog === null) {
    response.status(404).json({ message: `Blog with id ${id} not found` });
  } else {
    response.status(200).json(foundBlog);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = request.token;
  const user = request.user;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  // console.log(token, decodedToken, decodedToken.id);
  // console.log(0);

  if (!(token && decodedToken.id)) {
    // console.log(1);
    return response.status(401).json({ error: "token invalid" });
  } else {
    // console.log(2);
    if (user === null || user === undefined) {
      return response.status(400).json({
        message: `Cannot create blog since user with id ${body.userId} is not found`,
      });
    } else {
      // console.log(3);
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.userId,
      });

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      response.status(201).json(savedBlog);
    }
  }
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token invalid" });
  } else {
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(id);

    if (!blog) {
      response.status(404).json({ message: `Blog with id ${id} not found` });
    } else {
      if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndDelete(id);
        response.status(204).json({ message: `Blog Deleted Successfully` });
      } else {
        response.status(400).json({
          message: `Blog with id ${id} cannot be deleted by user with id ${decodedToken.id} because that blog was not added by this user`,
        });
      }
    }
  }
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const isUpdated = await Blog.findByIdAndUpdate(id, updatedBlog, {
    new: true,
  });

  if (isUpdated === null) {
    response.status(404).json({
      message: `Cannot update the blog with id ${id} because it is not found`,
    });
  } else {
    response
      .status(200)
      .json({ message: `Blog with id ${id} updated successfully.` });
  }
});

module.exports = blogRouter;

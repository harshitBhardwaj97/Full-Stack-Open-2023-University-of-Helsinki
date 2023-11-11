const bcrypt = require("bcrypt");
const config = require("../utils/config");
const userRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  console.log(username, name, password, request.body);

  if (!(username && password)) {
    return response
      .status(400)
      .json({ message: `username and password is required` });
  } else if (
    (username.length < 3 && password.length < 3) ||
    username.length < 3 ||
    password.length < 3
  ) {
    return response.status(400).json({
      message: `minimum 3 characters required in username/password fields`,
    });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.status(200).json(users);
});

userRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id);

  if (!user) {
    response.status(404).json({ message: `User with id ${id} not found` });
  } else {
    await user.populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    response.status(200).json(user);
  }
});

module.exports = userRouter;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const app = require("../app");
mongoose.set("bufferTimeoutMS", 30000);

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Full Stack Open",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com/en",
    likes: 10000,
  },
  {
    title: "Building AI",
    author: "Matti Luukkainen",
    url: "https://buildingai.elementsofai.com/",
    likes: 20000,
  },
  {
    title: "Haskell MOOC",
    author: "Matti Luukkainen",
    url: "https://haskell.mooc.fi/",
    likes: 10000,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
}, 30000);

describe("checking blog get functionality", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 30000);

  test("correct number of blogs are returned", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(initialBlogs.length);
  }, 30000);

  test("checking get blogs with valid id", async () => {
    const blogs = await api.get("/api/blogs");

    const validBlogId = blogs.body[0].id;

    console.log(blogs);

    await api.get(`/api/blogs/${validBlogId}`).expect(200);
  }, 30000);

  test("checking get blogs with invalid id", async () => {
    const blogs = await api.get("/api/blogs");

    const invalidBlogId = `12345`;

    await api.get(`/api/blogs/${invalidBlogId}`).expect(400);
  }, 30000);

  test("checking get blogs with not found id", async () => {
    const blogs = await api.get("/api/blogs");

    const randomNumberString = String(Math.floor(Math.random() * 100));

    const notFoundBlogId = blogs.body[0].id.slice(0, -2) + randomNumberString;

    await api.get(`/api/blogs/${notFoundBlogId}`).expect(404);
  }, 30000);

  test("unique id for blogs is defined", async () => {
    const blogs = await api.get("/api/blogs");
    const blogsArr = blogs.body;

    blogsArr.forEach((blog) => {
      expect(blog).toHaveProperty("id");
    });
  }, 30000);
}, 30000);

describe("checking blog post functionality", () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("qwerty@123", 10);
    const user = await new User({
      name: "New User",
      username: "New UserName",
      passwordHash,
    }).save();

    const userForToken = { username: "New UserName", id: user.id };
    return (token = jwt.sign(userForToken, process.env.SECRET));
  }, 30000);

  test("a valid blog can be added by authorized user", async () => {
    const newBlog = {
      title: "Test Blog added by new user",
      author: "New User",
      url: "https://fullstackopen.com/en",
      likes: "10000",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain("Test Blog added by new user");
  }, 30000);

  test("a valid blog cannot be added without authorization header", async () => {
    const newBlogWithoutAuthorizationHeader = {
      title: "Test Blog added without authorization header",
      author: "New User",
      url: "https://fullstackopen.com/en",
      likes: "10000",
    };

    await api
      .post("/api/blogs")
      .send(newBlogWithoutAuthorizationHeader)
      .expect(401);
  }, 30000);

  test("a valid blog cannot be added with incorrect authorization header", async () => {
    const newBlogWithIncorrectAuthorizationHeader = {
      title: "Test Blog added with incorrect authorization header",
      author: "New User",
      url: "https://fullstackopen.com/en",
      likes: "10000",
    };

    await api
      .post("/api/blogs")
      .send(newBlogWithIncorrectAuthorizationHeader)
      .set("Authorization", `Invalid Authorization Header`)
      .expect(401);
  }, 30000);

  test("blog without title and url field cannot be added", async () => {
    const newBlogWithoutTitleAndUrl = {
      author: "New User",
      likes: "10000",
    };

    await api
      .post("/api/blogs")
      .send(newBlogWithoutTitleAndUrl)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  }, 30000);

  test("a blog added without likes is saved with 0 likes", async () => {
    const blogWithoutLikes = {
      title: "Blog Without Likes",
      author: "John Doe",
      url: "https://fullstackopen.com/en",
    };

    await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    const blogs = await api.get("/api/blogs");

    const fetchedBlogWithoutLikes = blogs.body.filter((blog) => {
      return blog.title === "Blog Without Likes";
    });

    // console.log(blogs.body, fetchedBlogWithoutLikes);

    expect(fetchedBlogWithoutLikes[0].likes).toBe(0);
  }, 30000);
}, 30000);

describe("checking blog delete functionality", () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("qwerty@123", 10);
    const user = await new User({
      name: "Test User",
      username: "Test UserName",
      passwordHash,
    }).save();
    const userForToken = { username: "Test UserName", id: user.id };
    token = jwt.sign(userForToken, process.env.SECRET);

    // console.log(user.id);
    const blogToBeDeleted = {
      title: "Blog to be Deleted",
      author: "Test User",
      url: "https://fullstackopen.com/en",
      likes: "1000",
      userId: `${user.id}`,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogToBeDeleted)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    return token;
  }, 30000);

  test("blog can be deleted if same user deletes it", async () => {
    const startingBlogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    const blogToBeDeleted = startingBlogs[0];
    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const endingBlogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    expect(endingBlogs).toHaveLength(startingBlogs.length - 1);

    const titles = endingBlogs.map((blog) => blog.title);
    expect(titles).not.toContain(blogToBeDeleted.title);
  }, 30000);

  test("blog cannot be deleted with invalid token", async () => {
    const startingBlogs = await Blog.find({}).populate("user");
    const blogToBeDeleted = startingBlogs[0];

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set("Authorization", `Invalid Token`)
      .expect(401);

    const endingBlogs = await Blog.find({}).populate("user");
    expect(endingBlogs).toHaveLength(startingBlogs.length);
  }, 30000);

  test("blog cannot be deleted with invalid blog id and valid token", async () => {
    const startingBlogs = await Blog.find({}).populate("user");

    await api
      .delete(`/api/blogs/12345`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    const endingBlogs = await Blog.find({}).populate("user");
    console.log(endingBlogs.body);
    expect(endingBlogs).toHaveLength(startingBlogs.length);
  }, 30000);
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
}, 30000);

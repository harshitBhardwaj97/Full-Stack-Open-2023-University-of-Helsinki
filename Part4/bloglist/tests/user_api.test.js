const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
mongoose.set("bufferTimeoutMS", 30000);

const api = supertest(app);

const User = require("../models/user");

const initialUsers = [
  {
    username: "root",
    name: "Superuser",
    password: "sekret",
  },
  {
    username: "matti",
    name: "Matti Luukkainen",
    password: "mattiuser",
  },
];

beforeAll(async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
  console.log(`Initial Users Saved !`);
}, 30000);

describe("checking user get functionality", () => {
  test("check all users get functionality", async () => {
    const users = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(users.body).toHaveLength(2);
  }, 30000);

  test("check get user functionality with valid id", async () => {
    const users = await api.get("/api/users");

    const validUserId = users.body[0].id;

    await api
      .get(`/api/users/${validUserId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 30000);

  test("check get user functionality with invalid id", async () => {
    const invalidBlogId = `12345`;
    await api.get(`/api/blogs/${invalidBlogId}`).expect(400);
  }, 30000);

  test("check get user functionality with not found id", async () => {
    const users = await api.get("/api/users");

    const randomNumberString = String(Math.floor(Math.random() * 100));

    const notFoundBlogId = users.body[0].id.slice(0, -2) + randomNumberString;

    await api.get(`/api/blogs/${notFoundBlogId}`).expect(404);
  }, 30000);
}, 30000);

describe("checking user post functionality", () => {
  test("a valid user can be added", async () => {
    const newUser = {
      username: "dan",
      name: "Dan Abramov",
      password: "danuser",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/users");

    const userContent = response.body.map((user) => {
      return {
        username: user.username,
        name: user.name,
      };
    });

    expect(response.body).toHaveLength(initialUsers.length + 1);
    expect(userContent[2]).toEqual({
      name: "Dan Abramov",
      username: "dan",
    });
  });

  test("a user without username and password cannot be added", async () => {
    const userWithoutUsernameAndPassword = {
      name: "Dan Abramov",
    };

    await api
      .post("/api/users")
      .send(userWithoutUsernameAndPassword)
      .expect(400);
  }, 30000);

  test("a user with duplicate username cannot be added", async () => {
    const userWithDupicateUsername = {
      username: "dan",
      name: "Dan Abramov",
      password: "danuser",
    };

    await api.post("/api/users").send(userWithDupicateUsername).expect(400);
  }, 30000);

  test("a user with less than 3 characters in username and password cannot be added", async () => {
    const userHavingUsernameAndPasswordLessThanThreeCharacters = {
      username: "a",
      name: "Dan Abramov",
      password: "b",
    };

    await api
      .post("/api/users")
      .send(userHavingUsernameAndPasswordLessThanThreeCharacters)
      .expect(400);
  }, 30000);
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
}, 30000);

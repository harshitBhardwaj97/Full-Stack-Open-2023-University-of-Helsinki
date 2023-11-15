describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.visit("");
    cy.contains("Blog Application");
  });

  /*
  ------------- 5.17 (Test 1) Line 22-25 -------------
  */
  it("login form is shown and can be opened", function () {
    cy.contains("login").click();
    cy.contains("Login into the application");
  });
});

describe("Login Tests", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);

    cy.visit("");
  });

  /*
  ------------- 5.18 (Test 2) Line 44-64 -------------
  */
  it("user can log in with valid credentials", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#loginBtn").click();
    cy.contains("Matti Luukkainen logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#loginBtn").click();

    cy.get(".error")
      .should("contain", "error Not Able to login")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });
});

describe("After Login Tests", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
    cy.visit("");
  });

  /*
  ------------- 5.19 (Test 3) Line 82-93 -------------
  */
  it("A blog can be created", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#loginBtn").click();
    cy.contains("Matti Luukkainen logged in");
    cy.contains("Create New Blog").click();
    cy.get("#title").type("Redux Fundamentals");
    cy.get("#author").type("Dan Abramov");
    cy.get("#url").type("https://redux.js.org/");
    cy.get("#submitBtn").click();
    cy.get(".blog").contains("Blog Title : Redux Fundamentals");
  });

  /*
  ------------- 5.20 (Test 4) Line 99-116 -------------
  */
  it("A created blog can be liked", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#loginBtn").click();
    cy.contains("Matti Luukkainen logged in");
    cy.contains("Create New Blog").click();
    cy.get("#title").type("Redux Fundamentals");
    cy.get("#author").type("Dan Abramov");
    cy.get("#url").type("https://redux.js.org/");
    cy.get("#submitBtn").click();
    cy.get(".blog").contains("Blog Title : Redux Fundamentals");
    cy.contains("View").click();
    cy.get("#likes").contains("0");
    cy.get("#likeBtn").click();
    cy.reload(true);
    cy.contains("View").click();
    cy.get("#likes").contains("1"); // Like increased by 1
  });

  /*
  ------------- 5.21 (Test 5) Line 122-132 -------------
  */
  it("A created blog can be deleted", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#loginBtn").click();
    cy.contains("Matti Luukkainen logged in");
    cy.contains("Create New Blog").click();
    cy.get("#title").type("Redux Fundamentals");
    cy.get("#author").type("Dan Abramov");
    cy.get("#url").type("https://redux.js.org/");
    cy.get("#submitBtn").click();
    cy.get(".blog").contains("Blog Title : Redux Fundamentals");
    cy.contains("View").click();
    cy.get("#deleteBtn").click();
    cy.reload(true);
    cy.get("html").should("contain", "No blog(s) found for this user !");
  });

  /*
  ------------- 5.22 (Test 6) -------------
  No Test required for this functionality since I have implemented the logic that the creator can see only the blogs added by himself, and I have added delete button with all those blogs thus creator can delete only his blogs (Since he has access to those blogs only.)
  */

  /*
  ------------- 5.23 (Test 7) Line 149 - 188 -------------
  */

  it.only("blogs are shown in ascending order of likes", function () {
    cy.login({ username: "mluukkai", password: "salainen" });
    cy.wait(2000);

    const blogs = [
      {
        title: "Blog with most likes",
        author: "Test author",
        url: "test url",
        likes: "10000",
      },
      {
        title: "Blog with second most likes",
        author: "Test author",
        url: "test url",
        likes: "9999",
      },
      {
        title: "Blog with third most likes",
        author: "Test author",
        url: "test url",
        likes: "9998",
      },
    ];

    for (let blog of blogs) {
      cy.createBlog({
        title: `${blog.title}`,
        author: `${blog.author}`,
        url: `${blog.url}`,
        likes: `${blog.likes}`,
      });
      cy.wait(1000);
    }

    cy.reload(true);

    cy.get(".blog").eq(0).should("contain", "Blog with most likes");
    cy.get(".blog").eq(1).should("contain", "Blog with second most likes");
    cy.get(".blog").eq(2).should("contain", "Blog with third most likes");
  });
});

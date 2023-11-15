Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: {
      title,
      author,
      url,
      likes,
      userId: `${JSON.parse(localStorage.getItem("loggedBlogAppUser")).id}`,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedBlogAppUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:5173");
});

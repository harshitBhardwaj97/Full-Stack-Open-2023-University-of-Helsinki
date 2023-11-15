import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("Blog Tests", () => {
  let container;

  const blog = {
    title: "Test Blog",
    author: "Test User",
    url: "https://fullstackopen.com/en",
    likes: 1,
    user: {
      username: "test",
      name: "Test User",
      id: "654f581a119fa18933dbd02a",
    },
    id: "6551d7e86f1e1026187c1de7",
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("renders content", () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("Test Blog");
  });

  test("initially only author and title are displayed (Step 1)", () => {
    const toggleableBlog = container.querySelector(".toggleable-blog");
    expect(toggleableBlog).toHaveStyle("display : none");
  });

  test("after clicking view rest of the details are displayed (Step 2)", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);
    const toggleableBlog = container.querySelector(".toggleable-blog");
    expect(toggleableBlog).not.toHaveStyle("display : none");
  });

  test("clicking like twice calls the event handler twice (Step 3)", async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();

    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    const likeButton = screen.getByText("Like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

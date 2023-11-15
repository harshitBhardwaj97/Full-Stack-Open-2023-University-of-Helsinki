import { useRef } from "react";
import Blog from "./Blog";
import Toggleable from "./Toggleable";
import CreateBlogForm from "./CreateBlogForm";

const Blogs = ({ blogs, user, onMessageChange }) => {
  const blogsFilteredByUserName = blogs.filter(
    (blog) => blog.user.username === user.username
  );

  const userToken = window.localStorage.getItem(
    "loggedBlogAppUserToken",
    user.token
  );

  // console.log(userToken);

  const compareLikes = (b1, b2) => {
    return b2.likes - b1.likes; // Sorted in descending order
  };

  blogsFilteredByUserName.sort(compareLikes);

  const blogRef = useRef();

  // console.log(blogsFilteredByUserName);

  return (
    <>
      <h2>Blogs</h2>
      {blogsFilteredByUserName.length == 0 ? (
        <div>
          <Toggleable buttonLabel="Create New Blog">
            <CreateBlogForm user={user} onMessageChange={onMessageChange} />
          </Toggleable>
          <p>No blog(s) found for this user !</p>
        </div>
      ) : (
        <div>
          <Toggleable buttonLabel="Create New Blog">
            <CreateBlogForm user={user} onMessageChange={onMessageChange} />
          </Toggleable>
          {blogsFilteredByUserName.map((blog) => (
            <Blog
              ref={blogRef}
              onMessageChange={onMessageChange}
              key={blog.id}
              blog={blog}
              userToken={userToken}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Blogs;

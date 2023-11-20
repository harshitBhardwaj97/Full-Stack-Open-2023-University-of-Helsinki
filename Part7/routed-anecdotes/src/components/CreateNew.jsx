import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
    // console.log(content);
    // console.log(author);
    // console.log(info);
    // console.log({
    //   content: content.value,
    //   author: author.value,
    //   info: info.value,
    //   votes: 0,
    // });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input name="content" {...content} required />
        </div>
        <div>
          author
          <input name="author" {...author} required />
        </div>
        <div>
          url for more info
          <input name="info" {...info} required />
        </div>
        <button type="submit">create</button>
        <button type="reset">clear</button>
      </form>
    </div>
  );
};

export default CreateNew;

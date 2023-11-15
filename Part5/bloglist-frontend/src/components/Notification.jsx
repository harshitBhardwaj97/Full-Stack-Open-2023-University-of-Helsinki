const Notification = ({ message }) => {
  const messageStyle = {
    backgroundColor: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const errorMessage = {
    color: "red",
  };

  const successMessage = {
    color: "green",
  };

  if (message === null) return null;
  else if (message.includes("error")) {
    return (
      <div style={{ ...messageStyle, color: "red" }} className="error">
        {message}
      </div>
    );
  } else {
    return (
      <div style={{ ...messageStyle, color: "green" }} className="success">
        {message}
      </div>
    );
  }
};

export default Notification;

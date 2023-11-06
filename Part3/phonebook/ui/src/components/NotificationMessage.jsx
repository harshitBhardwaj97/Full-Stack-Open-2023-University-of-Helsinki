import React from "react";

const NotificationMessage = ({ message, status }) => {
  if (message === null) return null;
  message.includes("added") ? (
    <div className="success__message">{message}</div>
  ) : (
    <div className="failure__message">{message}</div>
  );
  // else {
  //   return <div className={status}>{message}</div>;
  // }
};

export default NotificationMessage;

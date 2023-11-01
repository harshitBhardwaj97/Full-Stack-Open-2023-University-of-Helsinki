import React from "react";

const FeedbackButton = ({ text, onSmash }) => {
  let bgColor, hoverBgColor;

  switch (text) {
    case "Good":
      bgColor = "bg-green-200";
      hoverBgColor = "hover:bg-green-400";
      break;

    case "Neutral":
      bgColor = "bg-yellow-200";
      hoverBgColor = "hover:bg-yellow-400";
      break;

    case "Bad":
      bgColor = "bg-red-200";
      hoverBgColor = "hover:bg-red-400";
      break;
  }

  return (
    <button
      className={`px-2 py-4 w-[100px] ${bgColor} ${hoverBgColor} text-black ease-linear duration-150 rounded-full`}
      onClick={onSmash}
    >
      {text}
    </button>
  );
};

export default FeedbackButton;

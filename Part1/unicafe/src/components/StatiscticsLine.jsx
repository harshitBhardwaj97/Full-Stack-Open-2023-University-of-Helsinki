import React from "react";

const StatiscticsLine = ({ text, count }) => {
  return (
    // <div className="stats flex items-center gap-2 m-2">
    //   <div className="text">{text}</div>
    //   <div className="count">
    //     {text === "Positive" ? <div>{count} %</div> : <div>{count}</div>}
    //   </div>
    // </div>
    <tr class="border-[1px] border-black">
      <td
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {text}
      </td>
      <td
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {text === "Positive" ? <div>{count} %</div> : <div>{count}</div>}
      </td>
    </tr>
  );
};

export default StatiscticsLine;

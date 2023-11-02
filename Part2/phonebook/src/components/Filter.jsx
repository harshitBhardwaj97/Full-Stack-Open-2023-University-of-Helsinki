import React from "react";

const Filter = ({ value, onSmash }) => {
  return (
    <div className="search">
      Filter phonebook with
      <input type="text" value={value} onChange={onSmash} />
    </div>
  );
};

export default Filter;

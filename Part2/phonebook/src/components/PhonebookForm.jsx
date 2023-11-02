import React from "react";

const PhonebookForm = ({
  personName,
  personNumber,
  onNameChange,
  onNumberChange,
  submitHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input type="text" value={personName} onChange={onNameChange} />
      </div>
      <div>
        number:{" "}
        <input type="text" value={personNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PhonebookForm;

import React from "react";

const PersonsList = ({ searchQuery, persons, handleDelete }) => {
  return searchQuery === ""
    ? persons.map((person) => (
        <>
          <div
            key={person._id}
            style={{ display: "flex", gap: "4px", margin: "2px" }}
          >
            {person.name} {person.phoneNumber}
            <button
              onClick={() => {
                handleDelete(person.name, person.id);
                // deleteHandler(person.name, person.id);
              }}
            >
              Delete
            </button>
          </div>
        </>
      ))
    : persons
        .filter((person) => {
          return (
            person.name.toLowerCase().includes(searchQuery) ||
            person.name.includes(searchQuery)
          );
        })
        .map((person) => (
          <div
            key={person._id}
            style={{ display: "flex", gap: "4px", margin: "2px" }}
          >
            {person.name} {person.phoneNumber}
            <button
              button
              onClick={() => {
                handleDelete(person.name, person.id);
                // deleteHandler(person.name, person.id);
              }}
            >
              Delete
            </button>
          </div>
        ));
};

export default PersonsList;

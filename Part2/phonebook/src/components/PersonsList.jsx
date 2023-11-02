import React from "react";

const PersonsList = ({ searchQuery, persons }) => {
  return searchQuery === ""
    ? persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.phonenumber}
        </div>
      ))
    : persons
        .filter((person) => person.name.toLowerCase().includes(searchQuery))
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.phonenumber}
          </div>
        ));
};

export default PersonsList;

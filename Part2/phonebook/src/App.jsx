import { useState } from "react";
import Filter from "./components/Filter";
import PhonebookForm from "./components/PhonebookForm";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phonenumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phonenumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phonenumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phonenumber: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setnewPhoneNumber] = useState("");
  const [search, setSearch] = useState("");

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, phonenumber: newPhoneNumber };

    const nameAlreadyPresent = persons.filter(
      (person) => person.name === newName
    ).length;

    if (nameAlreadyPresent > 0) {
      alert(`${newName} is already added to phonebook !`);
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName("");
    setnewPhoneNumber("");
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  console.log(persons.filter((person) => person.name === search).length);
  console.log(newName);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={search} onSmash={handleSearch} />
      <h2>Add a New</h2>
      <PhonebookForm
        personName={newName}
        personNumber={newPhoneNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setnewPhoneNumber(e.target.value)}
        submitHandler={handlePersonSubmit}
      />
      <h2>Numbers</h2>
      <PersonsList searchQuery={search} persons={persons} />
    </div>
  );
};

export default App;

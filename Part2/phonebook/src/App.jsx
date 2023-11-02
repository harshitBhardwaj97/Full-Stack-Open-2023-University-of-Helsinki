import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook-service";
import Filter from "./components/Filter";
import PhonebookForm from "./components/PhonebookForm";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setnewPhoneNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    phonebookService
      .getAllNumbers()
      .then((response) => {
        console.log(response.data);
        setPersons(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePersonSubmit = (e) => {
    const newPerson = { name: newName, phonenumber: newPhoneNumber };

    const nameAlreadyPresent = persons.filter(
      (person) =>
        person.name === newName || person.name === newName.toLowerCase()
    );

    if (nameAlreadyPresent.length > 0) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace old number with new number ?`
        )
      ) {
        console.log(nameAlreadyPresent);
        // phonebookService
        //   .updateExistingPerson(nameAlreadyPresent[0].id, newPerson)
        //   .then((response) => console.log(response, response.data));
      }
      setNewName("");
      setnewPhoneNumber("");
      return;
    }

    phonebookService.addPerson(newPerson).then((response) => {
      console.log(response, response.data);
      setPersons(persons.concat(newPerson));
      setNewName("");
      setnewPhoneNumber("");
    });
  };

  const handleDelete = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      phonebookService.deletePerson(id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        console.log(response.data);
        setPersons(updatedPersons);
      });
    }
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
      <PersonsList
        searchQuery={search}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

let phonebookRecords = require("./data/phonebookdata");
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

const generateId = () => Math.floor(Math.random() * 1000000);

const doesNameExist = (personName) =>
  phonebookRecords.find((person) => person.name === personName);

app.get(`/api/persons`, (request, response) => {
  response.status(200).json(phonebookRecords);
});

app.get(`/info`, (request, response) => {
  const date = new Date();
  const numberOfPeople = phonebookRecords.length;
  const info = `
    <div>
    <p>Phonebook has info of ${numberOfPeople} people</p>
    <p>${date}</p>
    </div>
    `;

  response.status(200).send(info);
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);

  const person = phonebookRecords.find((record) => record.id === id);

  if (person) {
    response.status(200).send(person);
  } else {
    response
      .status(404)
      .json({ error: `Person with id ${id} not found`, status: 404 });
  }
});

app.delete(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);

  const person = phonebookRecords.find((record) => record.id === id);

  if (person) {
    response
      .status(204)
      .json({ message: `Person with id ${id} deleted Successfully` });
    phonebookRecords = phonebookRecords.filter((record) => record.id !== id);
    // console.log(phonebookRecords);
  } else {
    response.status(404).json({
      error: `Cannot delete since person with with id ${id} not found`,
    });
  }
});

app.post(`/api/persons`, (request, response) => {
  const id = generateId();
  const personName = request.body.name;
  const personNumber = request.body.number;

  if (
    personName === null ||
    personName === "" ||
    personNumber === null ||
    personNumber === ""
  ) {
    response
      .status(500)
      .json({ error: `Name or Number is missing in the content body !` })
      .end();
  } else if (personName && doesNameExist(personName)) {
    response.status(500).json({ error: `Name must be unique` }).end();
  } else {
    const addedPerson = {
      id,
      name: personName,
      number: personNumber,
    };
    phonebookRecords = phonebookRecords.concat(addedPerson);
    console.log(id, personName, personNumber, doesNameExist(personName));

    response.status(201).json(addedPerson).end();
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

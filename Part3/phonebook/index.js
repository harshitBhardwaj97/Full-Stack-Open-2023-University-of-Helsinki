require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;
const PORT = process.env.PORT;
const Person = require("./models/personModel");
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("dist"));

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

app.get(`/api/persons`, async (request, response) => {
  try {
    const persons = await Person.find({});
    response.status(200).json(persons);
    console.log(persons);
  } catch (error) {
    response.status(500);
    console.error(error);
  }
});

app.get(`/info`, (request, response) => {
  try {
    const date = new Date();
    Person.find({}).then((persons) => {
      const info = `
    <div>
    <p>Phonebook has info of ${persons.length} people</p>
    <p>${date}</p>
    </div>
    `;
      response.status(200).send(info);
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get(`/api/persons/:id`, async (request, response, next) => {
  try {
    const id = request.params.id;

    const person = await Person.findById(id);

    if (person) {
      response.status(200).json(person);
      console.log(person);
    } else {
      response.status(404).json({ error: "Not Found !" });
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (request, response, next) => {
  try {
    const body = request.body;

    // const duplicateNameId = await Person.findOne({ name: body.name }, "_id");

    // console.log(duplicateNameId, body.name, body.phoneNumber);

    const person = new Person({
      name: body.name,
      phoneNumber: body.phoneNumber,
    });

    // if (duplicateNameId) {
    //   await Person.findByIdAndUpdate(
    //     duplicateNameId,
    //     {
    //       name: body.name,
    //       phoneNumber: body.phoneNumber,
    //     },
    //     { new: true }
    //   );
    //   response.status(200).json({
    //     message: `Person with name ${body.name} updated successfully !`,
    //   });
    // }

    const savedPerson = await person.save();

    response.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.put(`/api/persons/:id`, async (request, response, next) => {
  try {
    const body = request.body;
    const id = request.params.id;
    await Person.findByIdAndUpdate(
      id,
      {
        name: body.name,
        phoneNumber: body.phoneNumber,
      },
      { new: true, runValidators: true, context: "query" }
    );
    response.status(200).json({
      message: `Person with name ${body.name} updated successfully !`,
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const deletedPerson = await Person.findByIdAndDelete(id);
    console.log(deletedPerson);

    if (deletedPerson !== null) {
      response.status(204).json(deletedPerson);
    } else {
      response.status(404).json({
        error: `Cannot delete person with id ${id}, because person is not found !`,
      });
    }
  } catch (error) {
    next(error);
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

mongoose
  .connect(url)
  .then(() => {
    console.log(`Connected with DB Successfully !`);
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

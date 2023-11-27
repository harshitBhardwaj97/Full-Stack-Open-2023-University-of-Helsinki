import express from "express";
import {
  addNewPatient,
  getNonSensitivePatientEntries,
} from "../services/patient-service";

import patientData from "../data/patients";

import { validateNewPatientEntry } from "../utils";
import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("patients endpoint called");
  res.status(200).json(getNonSensitivePatientEntries());
});

router.get("/:id", (req, res) => {
  console.log("specific patient endpoint called");
  try {
    const foundPatient: Patient | undefined = patientData.find(
      (patient) => patient.id === req.params.id
    );

    if (foundPatient) {
      res.status(200).json(foundPatient);
    } else {
      res
        .status(404)
        .json({ message: `Patient with id ${req.params.id} not found` });
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    console.log("add patient endpoint called");
    const newPatientEntry = validateNewPatientEntry(req.body);
    const addedPatientEntry = addNewPatient(newPatientEntry);
    res.status(201).json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

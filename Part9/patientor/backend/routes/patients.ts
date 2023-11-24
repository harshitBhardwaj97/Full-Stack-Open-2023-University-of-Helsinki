import express from "express";
import {
  addNewPatient,
  getNonSensitivePatientEntries,
} from "../services/patient-service";

import { validateNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("patients endpoint called");
  res.status(200).json(getNonSensitivePatientEntries());
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

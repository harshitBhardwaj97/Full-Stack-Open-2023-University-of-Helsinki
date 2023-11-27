import { v1 as uuid } from "uuid";
import { NonSensitivePatient, NewPatient, Patient } from "../types";
import patientData from "../data/patients";

export const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export const addNewPatient = (newPatient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...newPatient,
  };

  console.log(newPatientEntry);
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

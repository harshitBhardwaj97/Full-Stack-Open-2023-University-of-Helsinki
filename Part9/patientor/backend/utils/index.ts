import { NonSensitivePatient, Diagnose, NewPatient, Gender } from "../types";
import patientData from "../data/patients";
import diagnosesData from "../data/diagnoses";

export const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export const getDiagnosesData = (): Diagnose[] => {
  return diagnosesData;
};

export const validateNewPatientEntry = (object: unknown): NewPatient => {
  console.log(object);

  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseArgumentIsString(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseArgumentIsString(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseArgumentIsString(object.occupation, "occupation"),
    };

    return newPatientEntry;
  }

  throw new Error("Incorrect Data : some fields are missing.");
};

/*
---------------------------------------
HELPER FUNCTIONS TO VALIDATE THE INPUT
---------------------------------------
*/
const parseArgumentIsString = (arg: unknown, argName: string): string => {
  if (!arg || !isString(arg)) {
    throw new Error(`Incorrect or missing ${argName}`);
  }
  return arg;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

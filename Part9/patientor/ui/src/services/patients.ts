import axios from "axios";
import { Patient, PatientFormValues, Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);

  return data;
};

export default {
  getAll,
  create,
  getDiagnosis,
};

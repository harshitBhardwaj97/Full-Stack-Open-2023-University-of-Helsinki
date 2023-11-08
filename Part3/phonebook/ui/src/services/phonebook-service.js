import axios from "axios";

const BASE_URL = `https://fullstack-university-of-helenski-nodejs.onrender.com/api/persons`;

const getAllNumbers = () => {
  return axios.get(`${BASE_URL}`);
};

const addPerson = (addedPerson) => {
  return axios.post(`${BASE_URL}`, addedPerson);
};

const deletePerson = (personId) => {
  return axios.delete(`${BASE_URL}/${personId}`);
};

const updateExistingPerson = (personId, updatedPerson) => {
  return axios.put(`${BASE_URL}/${personId}`, updatedPerson);
};

export default {
  getAllNumbers,
  addPerson,
  deletePerson,
  updateExistingPerson,
};

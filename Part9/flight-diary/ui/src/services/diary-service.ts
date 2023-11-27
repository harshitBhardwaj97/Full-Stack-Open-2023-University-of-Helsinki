import axios from "axios";
import { DiaryEntry } from "../types";

const baseUrl = `http://localhost:3000/api/diaries`;

const getAllEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const createEntry = async (newDiaryEntry: unknown) => {
  const response = await axios.post(baseUrl, newDiaryEntry);
  return response.data;
};

export { getAllEntries, createEntry };

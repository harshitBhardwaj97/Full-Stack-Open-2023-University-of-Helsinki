import { Diagnose } from "../types";
import diagnosesData from "../data/diagnoses";

export const getDiagnosesData = (): Diagnose[] => {
  return diagnosesData;
};

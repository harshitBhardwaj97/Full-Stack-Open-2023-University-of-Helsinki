import { getHeightSquaredInMetres, getBmiRange } from "./utils";

const calculateBmi = (heightInCm: number, weightInKgs: number): string => {
  const bmi: number = weightInKgs / getHeightSquaredInMetres(heightInCm);
  return getBmiRange(bmi);
};

console.log(calculateBmi(180, 74));

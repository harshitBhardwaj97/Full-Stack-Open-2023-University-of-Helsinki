import {
  getHeightSquaredInMetres,
  getBmiRange,
  parseBmiProgramArgs,
} from "./utils";

const calculateBmi = (heightInCm: number, weightInKgs: number): string => {
  const bmi: number = weightInKgs / getHeightSquaredInMetres(heightInCm);
  return getBmiRange(bmi);
};

try {
  const { height, weight } = parseBmiProgramArgs(process.argv);
  console.log(calculateBmi(height, weight)); // Will log if 2 numbers are entered
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

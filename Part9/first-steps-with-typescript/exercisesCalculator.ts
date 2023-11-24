import { getExerciseResult, parseExerciseProgramArgs } from "./utils";
import { exerciseResult } from "./types";

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): exerciseResult => {
  return getExerciseResult(dailyExerciseHours, target);
};

try {
  const { dailyExercises, target } = parseExerciseProgramArgs(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

import { getExerciseResult } from "./utils";
import { exerciseResult } from "./types";

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): exerciseResult => {
  return getExerciseResult(dailyExerciseHours, target);
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1, 5, 6, 0, 9], 4));

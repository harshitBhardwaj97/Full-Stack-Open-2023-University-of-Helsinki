import { exerciseResult, rating, ratingDescription } from "../types";

/*
--------------------------------
Bmi Calculator Helper Functions
--------------------------------
*/

export const getHeightSquaredInMetres = (heightInCm: number): number => {
  const heightInMts = heightInCm / 100;
  return heightInMts * heightInMts;
};

export const getBmiRange = (bmi: number): string => {
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (Healthy Weight)";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return "Obese (Class II)";
  } else return "Obese (Class III)";
};

/*
-------------------------------------
Exercise Calculator Helper Functions
-------------------------------------
*/

const getTrainingDays = (dailyExerciseHours: number[]): number => {
  const trainingDays = dailyExerciseHours.filter(
    (exerciseHour) => exerciseHour > 0
  );
  return trainingDays.length;
};

const getDailyAverage = (dailyExerciseHours: number[]): number => {
  const totalHours = dailyExerciseHours.reduce(
    (acc, exercise) => acc + exercise,
    0
  );

  return totalHours / dailyExerciseHours.length;
};

export const getExerciseResult = (
  dailyExerciseHours: number[],
  target: number
): exerciseResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = getTrainingDays(dailyExerciseHours);

  const average = getDailyAverage(dailyExerciseHours);
  const success = average >= target;
  const metric = average / target;

  let rating: rating;
  let ratingDescription: ratingDescription;
  console.log(metric);

  if (metric <= 0.6) {
    rating = 1;
    ratingDescription = "need to put more efforts";
  } else if (metric >= 0.6 && metric <= 0.9) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "well done";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

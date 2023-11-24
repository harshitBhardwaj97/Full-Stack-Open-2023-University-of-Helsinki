import {
  exerciseResult,
  rating,
  ratingDescription,
  bmiProgramValues,
  exerciseProgramValues,
} from "../types";

/*
--------------------------------
Bmi Calculator Helper Functions
--------------------------------
*/

export const parseBmiProgramArgs = (args: string[]): bmiProgramValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

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

export const parseExerciseProgramArgs = (
  args: string[]
): exerciseProgramValues => {
  if (args.length < 5) throw new Error("Not enough arguments");

  for (let i = 2; i < args.length; i++) {
    if (Number.isNaN(Number(args[i]))) {
      throw new Error("Non numeric argument(s) passed");
    }

    if (Number(args[i]) < 0) {
      throw new Error("Negative argument(s) passed");
    }
  }

  const arrArg: number[] = [];
  for (let i = 2; i < args.length - 1; i++) {
    arrArg.push(Number(args[i]));
  }
  return {
    dailyExercises: arrArg,
    target: Number(args[args.length - 1]),
  };
};

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
  // console.log(metric);

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

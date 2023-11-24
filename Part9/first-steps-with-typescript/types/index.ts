export type ratingDescription =
  | "well done"
  | "not too bad but could be better"
  | "need to put more efforts";

export type rating = 1 | 2 | 3;

export interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescription: ratingDescription;
  target: number;
  average: number;
}

export interface bmiProgramValues {
  height: number;
  weight: number;
}

export interface exerciseProgramValues {
  dailyExercises: number[];
  target: number;
}

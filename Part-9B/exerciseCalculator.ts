export interface ExerciseValues {
  exerciseDays: number[];
  target: number;
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(exerciseDays: number[], target: number): Result {
  const periodLength = exerciseDays.length;
  const trainingDays = exerciseDays.filter(day => day > 0).length;
  const totalExercise = exerciseDays.reduce((sum, day) => sum + day, 0);
  const average = totalExercise / periodLength;
  const success = average >= target;
  
  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = 'Great job, you exercised more than your target quota.';
  } else if (average >= target) {
    rating = 2;
    ratingDescription = 'Good job, you hit the exercise quota.';
  } else if (average >= target * 0.8){
    rating = 2;
    ratingDescription = 'You were close to the target, be sure to exercise bit more.';
  } else {
    rating = 1;
    ratingDescription = 'You didn\'t reach the quota, be sure to exercise more.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: target,
    average
  };
};

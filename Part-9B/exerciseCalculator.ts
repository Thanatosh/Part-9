interface Data {
  exerciseDays: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(data: Data): Result {
  const periodLength = data.exerciseDays.length;
  const trainingDays = data.exerciseDays.filter(day => day > 0).length;
  const totalExercise = data.exerciseDays.reduce((sum, day) => sum + day, 0);
  const average = totalExercise / periodLength;
  const success = average >= data.target;
  
  let rating: number;
  let ratingDescription: string;

  if (average >= data.target * 1.5) {
    rating = 3;
    ratingDescription = 'Great job, you exercised more than your target quota.';
  } else if (average >= data.target) {
    rating = 2;
    ratingDescription = 'Good job, you hit the exercise quota.';
  } else if (average >= data.target * 0.9){
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
    target: data.target,
    average
  };
}

console.log(calculateExercises({ exerciseDays: [3, 0, 2, 4.5, 0, 3, 1], target: 2 }))
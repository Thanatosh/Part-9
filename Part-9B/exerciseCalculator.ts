interface ExerciseValues {
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

function calculateExercises(exerciseDays: number[], target: number): Result {
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

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  const target = Number(args[2]);
  const exerciseDays = args.slice(3).map(day => {
    if (isNaN(Number(day))) {
      throw new Error('Provided values weren\'t numbers!');
    }
    return Number(day);
  });

  if (isNaN(target)) {
    throw new Error('Provided target value wasn\'t a number!');
  }

  return {
    exerciseDays,
    target
  };
};

try {
  const { exerciseDays, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseDays, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};

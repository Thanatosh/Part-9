interface Values {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / ((height / 100) ** 2);

  const SEVERE_THINNESS = 16;
  const MODERATE_THINNESS = 17;
  const MILD_THINNESS = 18.5;
  const NORMAL = 25;
  const OVERWEIGHT = 30;
  const OBESE_CLASS_I = 35;
  const OBESE_CLASS_II = 40;

  switch (true) {
    case (BMI < SEVERE_THINNESS):
      return 'Severe Thinness';
    case (BMI >= SEVERE_THINNESS && BMI < MODERATE_THINNESS):
      return 'Moderate Thinness';
    case (BMI >= MODERATE_THINNESS && BMI < MILD_THINNESS):
      return 'Mild Thinness';
    case (BMI >= MILD_THINNESS && BMI < NORMAL):
      return 'Normal';
    case (BMI >= NORMAL && BMI < OVERWEIGHT):
      return 'Overweight';
    case (BMI >= OVERWEIGHT && BMI < OBESE_CLASS_I):
      return 'Obese Class I';
    case (BMI >= OBESE_CLASS_I && BMI <= OBESE_CLASS_II):
      return 'Obese Class II';
    case (BMI > OBESE_CLASS_II):
      return 'Obese Class III';
    default:
      return null;
  }
}

const parseBmiArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values weren\'t numbers!');
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
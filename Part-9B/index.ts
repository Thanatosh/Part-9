import express from "express";
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  
  return res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: unknown, target: unknown };

  if (!Array.isArray(daily_exercises) || !target || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const allNumbers = daily_exercises.every((exercise) => typeof exercise === 'number');
  if (!allNumbers) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, Number(target));

  return res.json({result});
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
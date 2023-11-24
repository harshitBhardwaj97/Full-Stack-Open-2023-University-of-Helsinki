import express from "express";
import { check, validationResult } from "express-validator";
import { calculateBmi, calculateExercises } from "./modules";
const app = express();
app.use(express.json());

const validateBmiParams = [
  check("height")
    .exists()
    .withMessage("Height is required")
    .isInt({ min: 1 })
    .withMessage("Height must be a positive integer"),
  check("weight")
    .exists()
    .withMessage("Weight is required")
    .isInt({ min: 1 })
    .withMessage("Weight must be a positive integer"),
];

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get(
  "/bmi",
  validateBmiParams,
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    const { height, weight } = req.query;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const bmi = calculateBmi(Number(height), Number(weight));
      return res.status(200).json({ height, weight, bmi });
    }
  }
);

app.post("/exercises", (req, res) => {
  const daily_exercises: number[] = req.body.daily_exercises;
  const target: number = req.body.target;

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "daily_exercises must be an array" });
  }

  if (typeof target !== "number" || Number.isNaN(target)) {
    return res.status(400).send({ error: "target must be a number" });
  }

  if (daily_exercises.length === 0) {
    return res
      .status(400)
      .send({ error: "daily_exercises array cannot be empty" });
  }

  for (const exercise of daily_exercises) {
    if (typeof exercise !== "number" || Number.isNaN(exercise)) {
      return res
        .status(400)
        .send({ error: "daily_exercises must contain only numbers" });
    }
  }
  const result = calculateExercises(daily_exercises, target);
  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

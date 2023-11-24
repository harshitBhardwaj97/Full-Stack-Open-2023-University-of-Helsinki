import express from "express";
import { getDiagnosesData } from "../services/diagnoses-service";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("diagnoses endpoint called");
  res.status(200).json(getDiagnosesData());
});

export default router;

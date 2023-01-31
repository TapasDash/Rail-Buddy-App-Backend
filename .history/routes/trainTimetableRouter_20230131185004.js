import express from "express";
import { getTrainData } from "../controllers/trainController";

const trainTimetableRouter = express.Router();

trainTimetableRouter
  .route("train/:sourceStation/:destinationStation")
  .get(getTrainData);

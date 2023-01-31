import express from "express";
import { getTrainData } from "../controllers/trainController.js";

const trainTimetableRouter = express.Router();

trainTimetableRouter
  .route("train/:sourceStation/:destinationStation")
  .get(getTrainData);

export default trainTimetableRouter;

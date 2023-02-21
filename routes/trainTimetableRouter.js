import express from "express";
import {
  getTrainData,
  getTrainsBetweenStations,
} from "../controllers/trainController.js";

const trainTimetableRouter = express.Router();

trainTimetableRouter.route("/train").get(getTrainData);
trainTimetableRouter
  .route("/trains/:fromStation/:toStation")
  .get(getTrainsBetweenStations);

export default trainTimetableRouter;

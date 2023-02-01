import express from "express";
import { getTrainData } from "../controllers/trainController.js";

const trainTimetableRouter = express.Router();

trainTimetableRouter.route("/train").get(getTrainData);

export default trainTimetableRouter;

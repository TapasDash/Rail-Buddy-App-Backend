import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable";

export const getTrainData = asyncHandler(async (req, res) => {
  const { sourceStation, destinationStation } = req.params;
  const data = await TrainTimetable.find({ sourceStation, destinationStation });
});

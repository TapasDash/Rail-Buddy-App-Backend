import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable.js";

export const getTrainData = asyncHandler(async (req, res) => {
  const { sourceStation, destinationStation } = req.params;
  const data = await TrainTimetable.find({ sourceStation, destinationStation });
  return res.status(200).json({
    success: true,
    data,
  });
});

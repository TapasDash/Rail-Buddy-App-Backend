import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable.js";

export const getTrainData = asyncHandler(async (req, res) => {
  const { sourceStation, destinationStation } = req.params;
  const trainData = await TrainTimetable.find({
    sourceStation,
    destinationStation,
  });

  const unique = [...new Set(trainData.map((item) => item.trainNo))];

  return res.status(200).json({
    success: true,
    data: unique,
  });
});

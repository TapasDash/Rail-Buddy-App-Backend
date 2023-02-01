import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable.js";

export const getTrainData = asyncHandler(async (req, res) => {
  const { sourceStation, destinationStation } = req.params;
  const trainData = await TrainTimetable.find(req.params));

  const trainNos = [];
  const uniqueTrainData = [];
  trainData.map((data) => {
    trainNos.push(data.trainNo);
    if (!trainNos.includes(data.trainNo)) uniqueTrainData.push(data);
  });

  return res.status(200).json({
    success: true,
    data: uniqueTrainData,
  });
});


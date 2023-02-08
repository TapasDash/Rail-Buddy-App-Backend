import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable.js";

export const getTrainData = asyncHandler(async (req, res) => {
  console.log(req.query);
  const data = await TrainTimetable.find(req.query);
  console.log({ data });
  return res.status(200).json({
    success: true,
    data,
  });
});

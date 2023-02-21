import asyncHandler from "express-async-handler";
import TrainTimetable from "../models/TrainTimetable.js";

export const getTrainData = asyncHandler(async (req, res) => {
  console.log(req.query);
  const data = await TrainTimetable.find(req.query).sort("seq");
  return res.status(200).json({
    success: true,
    data,
  });
});

export const getTrainsBetweenStations = asyncHandler(async (req, res) => {
  const { fromStation, toStation } = req.params;
  const data1 = await TrainTimetable.find({
    stationCode: fromStation,
    destinationStation: toStation,
  });
  const data2 = await TrainTimetable.find({
    stationCode: fromStation,
    sourceStation: toStation,
  });
  const data3 = await TrainTimetable.find({
    sourceStation: fromStation,
    stationCode: toStation,
  });

  const data = [...data1, ...data2, data3];
  return res.status(200).json({
    success: true,
    data,
  });
});

// export const getSourcesData = asyncHandler(async (req, res) => {
//   const { fromStation, toStation } = req.params;
//   const data = await Customer.aggregate()
//     .match({ dealership })
//     .facet({
//       data1: [
//         {
//           $match: {
//             stationCode: fromStation,
//             destinationStation: toStation,
//           },
//         },
//       ],
//       data2: [
//         {
//           $match: {
//             stationCode: fromStation,
//             destinationStation: toStation,
//           },
//         },
//       ],
//     });

//   return res.status(200).json({
//     success: true,
//     tableData: customerData,
//   });
// });

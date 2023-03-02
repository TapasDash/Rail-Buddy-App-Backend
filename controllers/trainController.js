import asyncHandler from "express-async-handler";
import redisClient from "../config/redisClient.js";
import TrainTimetable from "../models/TrainTimetable.js";

export const getTrainData = asyncHandler(async (req, res) => {
  const trainData = await TrainTimetable.find(req.query).sort("seq").lean();

  //   const trainNos = [];
  //   const uniqueTrainData = [];
  //   trainData.map((data) => {
  //     trainNos.push(data.trainNo);
  //     if (!trainNos.includes(data.trainNo)) uniqueTrainData.push(data);
  //   });

  return res.status(200).json({
    success: true,
    data: trainData,
  });
});

export const getTrainsBetweenStations = asyncHandler(async (req, res) => {
  const { fromStation, toStation } = req.params;
  // let fromStationData = await TrainTimetable.find({
  //   stationCode: fromStation,
  // });
  // let toStationData = await TrainTimetable.find({
  //   stationCode: toStation,
  // });

  const cachedTrainBtwData = await redisClient.get(
    `trainsbtw-${fromStation}-${toStation}`
  );
  if (cachedTrainBtwData) {
    console.log("using cached data");
    return res.status(200).json({
      cached: true,
      success: true,
      data: JSON.parse(cachedTrainBtwData),
    });
  }

  const [fromStationData, toStationData] = await Promise.all([
    await TrainTimetable.find({
      stationCode: fromStation,
    }),
    await TrainTimetable.find({
      stationCode: toStation,
    }),
  ]);

  // const fromStationData = [
  //   {
  //     _id: {
  //       $oid: "63ef5390647b51486cdac0a6",
  //     },
  //     departureTime: "15:50:00",
  //     destinationStation: "CSMT",
  //     destinationStationName: "CST-MUMBAI",
  //     distance: "18",
  //     seq: 2,
  //     sourceStation: "BBS",
  //     sourceStationName: "BHUBANESWAR",
  //     stationCode: "KUR",
  //     stationName: "KHURDA ROAD",
  //     trainName: "KONARK EXPRE",
  //     trainNo: "11020",
  //     arrivalTime: "15:45:00",
  //   },
  // ];

  // const data2 = [
  //   {
  //     _id: {
  //       $oid: "63ef5390647b51486cdac0a9",
  //     },
  //     departureTime: "17:50:00",
  //     destinationStation: "CSMT",
  //     destinationStationName: "CST-MUMBAI",
  //     distance: "165",
  //     seq: 5,
  //     sourceStation: "BBS",
  //     sourceStationName: "BHUBANESWAR",
  //     stationCode: "BAM",
  //     stationName: "BERHAMPUR",
  //     trainName: "KONARK EXPRE",
  //     trainNo: "11020",
  //     arrivalTime: "17:40:00",
  //   },
  // ];
  const trainBtw = [];

  fromStationData.map((fromStation) => {
    // console.log({ trainNo, sourceStation, destinationStation, seq });
    const toStationDataFiltered = toStationData.find((toStation) => {
      // console.log({ toStation });
      return (
        fromStation.trainNo === toStation.trainNo &&
        fromStation.sourceStation === toStation.sourceStation &&
        fromStation.destinationStation === toStation.destinationStation &&
        fromStation.seq < toStation.seq
      );
    });
    toStationDataFiltered &&
      trainBtw.push({ src: fromStation, dest: toStationDataFiltered });
  });
  await redisClient.set(
    `trainsbtw-${fromStation}-${toStation}`,
    JSON.stringify(trainBtw)
  );
  return res.status(200).json({
    success: true,
    data: trainBtw,
  });
});

export const getTrainInfo = asyncHandler(async (req, res) => {
  const data = await TrainTimetable.find()
    .select("trainNo trainName")
    .limit(100);
  const uniqueData = [
    ...new Set(
      data.map(({ trainNo, trainName }) => ({
        trainNo,
        trainName,
      }))
    ),
  ]; //
  return res.status(200).json({
    success: true,
    uniqueData,
  });
});

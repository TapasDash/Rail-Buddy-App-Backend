import mongoose from "mongoose";

const { Schema } = mongoose;

const trainTimetableSchema = new Schema(
  {
    departureTime: String,
    destinationStation: String,
    destinationStationName: String,
    distance: String,
    seq: String,
    sourceStation: String,
    sourceStationName: String,
    stationCode: String,
    stationName: String,
    trainName: String,
    trainNo: String,
    arrivalTime: String,
  },
  { timestamps: true }
);

const TrainTimetable = mongoose.model("timetable", trainTimetableSchema);

export default TrainTimetable;

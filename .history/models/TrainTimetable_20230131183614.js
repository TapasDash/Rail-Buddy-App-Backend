import mongoose from "mongoose";

const { Schema } = mongoose;

const trainTimetableSchema = new Schema({}, { timestamps: true });

const TrainTimetable = mongoose.model("TrainTimetable", trainTimetableSchema);

export default TrainTimetable;

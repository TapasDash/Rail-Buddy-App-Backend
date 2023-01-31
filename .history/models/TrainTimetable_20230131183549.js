import mongoose from "mongoose";

const { Schema } = mongoose;

const trainTimetableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: { type: Number, min: 24, max: 54, required: true },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", trainTimetableSchema);

export default Course;

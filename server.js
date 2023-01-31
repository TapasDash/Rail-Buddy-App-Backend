import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import trainTimetableRouter from "./routes/trainTimetableRouter.js";

const app = express();

dotenv.config();
connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1", trainTimetableRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

//scheduler script to empty bucket size of Sales Executive..

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} at port ${PORT}`)
);

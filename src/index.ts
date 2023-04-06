import express from "express";
import { config } from "dotenv";
config();
import { connectDB } from "./db";
import cors from "cors";
import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import authRoute from "./routes/auth";
import movieRoute from "./routes/movies";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
connectDB();

// app routes
app.get("/", (req, res) => {
  return res.send("index page");
});
app.use("/auth", authRoute);
app.use("/movie", movieRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: { message: string; status: number },
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.json(err);
});

// app listen
app.listen(process.env.PORT, () => {
  console.log("Funny movie service is running...");
});

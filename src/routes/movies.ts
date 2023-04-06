import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth";
import Movie from "../models/Movie";

router.post("/", authMiddleware, async (req, res) => {
  const { url } = req.body;
  const username = res.locals.username;
  const errors = [];

  if (!url) errors.push({ msg: "url is required" });
  if (errors.length > 0) return res.json({ code: 0, data: errors });
  else {
    const movieData = { url, createdBy: username };
    console.log({ movieData });
    const movie = new Movie(movieData);
    await movie.save();
    return res.json({ code: 1, msg: "Movie has shared." });
  }
});

router.get("/", async (req, res) => {
  const movies = await Movie.find({});
  return res.json({ code: 1, data: movies });
});

export default router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Movie = require("../models/Movie");

// router.use(authMiddleware);

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

module.exports = router;

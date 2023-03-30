const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username) errors.push({ msg: "username is required." });
  if (!password) errors.push({ msg: "password is required." });
  if (errors.length > 0) return res.json(errors);
  else {
    const u = await User.findOne({ username });
    if (u) {
      return res.json({ code: 0, msg: "Username has been registered!" });
    }
    const hasPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const userData = { username, password: hasPassword };
    const user = new User(userData);
    await user.save();
    return res.json({ code: 1, msg: "Register success." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ code: 0, msg: "Username or password is invalid." });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.json({ code: 0, msg: "Username or password is invalid." });

    // Create JWT
    const accessToken = jwt.sign(
      { username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.json({
      code: 1,
      data: { accessToken, username },
    });
  } catch (error) {
    console.log(error);
    return res.json({ code: 0, msg: "Can not login" });
  }
});

module.exports = router;

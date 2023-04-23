const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

module.exports = router;

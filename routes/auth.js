const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Dump = require("../models/Dump");
//
// router.get("/", (req, res) => {
//   res.send("auth route");
// });
router.get("/", async (req, res) => {
  res.send("helo from auth route");
});

// Testing Done
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Getting all dumps of the user:
    const dumps = await Dump.find({ user: user.username }).sort({
      updatedAt: -1,
    });

    console.log(dumps);
    console.log(user.id);

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_PASSWORD,
      { expiresIn: 40000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ user, dumps, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;

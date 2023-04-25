const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

// Route to register user:
// Testing done, able to register user from frontend
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const tempUser = await User.findOne({ username: username });
    const tempEmail = await User.findOne({ email: email });

    if (tempUser) {
      return res.send("usrname already exist");
    }

    if (tempEmail) {
      return res.send("Email already eixsts.");
    }

    let user = { username, email, password };
    const salt = await bcrypt.genSalt(parseInt(12));
    user.password = await bcrypt.hash(password, salt);

    let Token = null;
    const payload = {
      user: {
        id: user.username,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_PASSWORD,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        Token = token;
      }
    );
    user = await User.create(user);
    res.status(201).json({ user, Token });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

module.exports = router;

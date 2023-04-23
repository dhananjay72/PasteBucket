// Get all dumps
// Get single dump
// delete dump
// Post dump
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Dump = require("../models/Dump");
// const nanoid = require("../config/nanoid");

// import nanoid from "nanoid";

// Create new dump
router.post("/", async (req, res) => {
  const { title, text, password, access, expiration_date } = req.body;

  let dump = {};
  dump.text = text;
  dump.access = access;
  if (title) dump.title = title;
  if (expiration_date) {
    dump.has_expiration_date = true;
    dump.expiration_date = expiration_date;
  }

  // console.log("hello from post route");
  try {
    if (req.user) {
      dump.user = req.user.id;
    } else {
      dump.user = process.env.DEFAULT_USER_ID;
    }

    console.log(dump);

    dump = await Dump.create(dump);
    res.json({ dump });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;

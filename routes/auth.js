const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//
// router.get("/", (req, res) => {
//   res.send("auth route");
// });
router.get("/", async (req, res) => {
  res.send("helo from auth route");
});

router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;

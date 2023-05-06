// Get all dumps - done (testing pending)
// Get single dump - done (testing pending)
// delete dump
// Post dump - done
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Dump = require("../models/Dump");
const CheckForToken = require("../middleware/checkForToken");
const auth = require("../middleware/auth");

const getUniqueId = () => {
  const tt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = tt.length;

  let id = "";
  for (let i = 0; i < 6; i++) {
    let randomNumber = Math.floor(Math.random() * len);
    id += tt.charAt(randomNumber);
  }
  return id;
};

// Create new dump
// Testing done, able to post from the frontend
router.post("/", async (req, res) => {
  console.log(req.body);

  const { title, text, password, access, expiration_date, user } = req.body;

  let dump = {};
  dump.text = text;
  dump.access = access;
  if (title) dump.title = title;
  if (expiration_date) {
    dump.has_expiration_date = true;
    dump.expiration_date = expiration_date;
  }

  // console.log("hello from post route", req.body);
  try {
    if (user) {
      // console.log("I am executing");
      dump.user = user;
    } else {
      dump.user = process.env.DEFAULT_USER_ID;
    }

    console.log(dump);

    // creating random unique url:
    let id = getUniqueId();
    while (await Dump.findOne({ slug: id })) {
      id = getUniqueId();
    }

    dump.slug = id;

    dump = await Dump.create(dump);
    console.log(dump);
    res.json({ dump });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// Get single Dump with respective id:
// Testing pending

router.get("/:slug", CheckForToken, async (req, res) => {
  try {
    const dump = await Dump.findOne({ slug: req.params.slug });
    console.log(req.params.slug);
    console.log(dump);

    if (!dump) {
      return res.status(404).json({ errors: [{ msg: "Dump not fund" }] });
    }

    if (dump.access === "PVT") {
      if (!req.user) {
        return res.status(404).json({ errors: [{ msg: "Dump not found" }] });
      }
      // if (dump.user.id.toString() !== req.user.id) {
      //   return res.status(404).json({ errors: [{ msg: "Dump not found" }] });
      // }
    }

    return res.json(dump);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// TO get all dump of the user:
// Testing pending
router.get("/", auth, async (req, res) => {
  console.log("exe");
  try {
    const dumps = await Dump.find({ user: req.user.id }).sort({
      updatedAt: -1,
    });

    if (!dumps) {
      return res.status(404).json({ errors: { msg: "Dump not found" } });
    }
    return res.json({ user: req.user.id, dumps });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Delete dump:
// testing done from frontend, need to do some changes;

router.delete("/:id", auth, async (req, res) => {
  try {
    console.log(req.params.id);
    const dump = await Dump.findOne({ slug: req.params.id });

    if (!dump) {
      return res.status(404).json({ msg: "Dump not found" });
    }

    console.log(dump.user.toString(), req.user.id);
    // if (dump.user.toString() !== req.user.id) {
    //   if (dump.access === "PVT") {
    //     return res.status(404).json({ msg: "Dump not found" });
    //   }
    //   return res.status(401).json({ msg: "You cannot delete the dump" });
    // }
    await Dump.findOneAndDelete({ slug: req.params.id });
    console.log("deleted");
    return res.json({ msg: "post deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;

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
// Partially done
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

    // creating random unique url:
    let id = getUniqueId();
    while (await Dump.findOne({ slug: id })) {
      id = getUniqueId();
    }

    dump.slug = id;

    dump = await Dump.create(dump);
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

    if (!dump) {
      return res.status(404).json({ errors: [{ msg: "Dump not fund" }] });
    }

    if (dump.access === "PVT") {
      if (!req.user) {
        return res.status(404).json({ errors: [{ msg: "Dump not found" }] });
      }
      if (dump.user.id.toString() !== req.user.id) {
        return res.status(404).json({ errors: [{ msg: "Dump not found" }] });
      }
    }

    return res.json(dump);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// TO get all dump of the user:
// Testing pending
router.get("/", auth, async (req, res) => {
  try {
    const dumps = await Dump.find({ user: req.user.id }).sort({
      updatedAt: -1,
    });

    if (!dumps) {
      return res.status(404).json({ errors: { msg: "Dump not found" } });
    }
    return res.json(dumps);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Delete dump:
// testing pending;

router.delete("/:id", auth, async (req, res) => {
  try {
    const dump = await Dump.findById(req.params.id);

    if (!dump) {
      return res.status(404).json({ msg: "Dump not found" });
    }

    if (dump.user.toString() !== req.user.id) {
      if (dump.access === "PVT") {
        return res.status(404).json({ msg: "Dump not found" });
      }
      return res.status(401).json({ msg: "You cannot delete the dump" });
    }

    await dump.remove();
    console.log("deleted");
    return res.json({ msg: "post deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;

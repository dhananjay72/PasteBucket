const mongoose = require("mongoose");

const DumpSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    user: {
      type: String,
      ref: "user",
    },
    access: {
      type: String,
      enum: ["PVT", "UNL"],
      uppercase: true,
      default: "UNL",
    },
    has_expiration_date: {
      type: Boolean,
      default: false,
    },
    expiration_date: {
      type: Date,
      default: () => {
        let oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        return oneYearFromNow;
      },
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dump", DumpSchema);

const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please, Provide Company Name!"],
      maxlength: 22,
    },
    position: {
      type: String,
      required: [true, "Please, Provide Designation!"],
      maxlength: 26,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please, Provide User!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

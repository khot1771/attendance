const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    studId: {
      type: mongoose.Types.ObjectId, //custom data id
      ref: "student", //ya table madhun id ghe  (foigen key )
      required: true,
    },
    isPresent: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "offline",
      enum: ["offline", "online"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendance", attendanceSchema);

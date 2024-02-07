const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batchId: {
      type: mongoose.Types.ObjectId, //custom data id
      ref: "batch", //ya table madhun id ghe  (foigen key )
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);

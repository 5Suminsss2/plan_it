const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    topic: { type: String, required: true },
    state: { type: String, required: true, default: "pre" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);

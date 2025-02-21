const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  state: { type: String, required: true, default: "pre" },
});

module.exports = mongoose.model("Todo", TodoSchema);

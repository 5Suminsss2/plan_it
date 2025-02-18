const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  state: { type: String, required: true, default: "pre" },
});

module.exports = mongoose.model("Todo", TodoSchema);

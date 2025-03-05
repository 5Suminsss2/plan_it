const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Topic", TopicSchema);

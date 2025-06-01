const express = require("express");
const SharedPlan = require("../models/SharedPlan");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const topics = await SharedPlan.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topic" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { _id, title, color } = req.body;
    const newTopic = new SharedPlan({ _id, title, color });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ message: "Error adding topic" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTopic = await SharedPlan.findOneAndDelete({ _id: id });
    if (!deletedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json({ message: "Topic deleted successfully", deletedTopic });
  } catch (error) {
    res.status(500).json({ message: "Error deleting topic" });
  }
});

module.exports = router;

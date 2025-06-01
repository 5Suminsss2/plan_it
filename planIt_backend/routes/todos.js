const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// 모든 Todo 가져오기
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;
    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);
      const todos = await Todo.find({ createdAt: { $gte: start, $lte: end } });
      return res.json(todos);
    }
    const allTodos = await Todo.find();
    res.json(allTodos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// pre 상태인 Todo 가져오기
router.get("/pre", async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const preTodos = await Todo.find({
      state: "pre",
      createdAt: { $lt: startOfToday },
    });
    res.status(200).json(preTodos);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// preTodo를 오늘 할일로 바꾸기
router.post("/move-to-today", async (req, res) => {
  try {
    const todos = req.body;
    const idsToDelete = todos.map((t) => t._id);
    await Todo.deleteMany({ _id: { $in: idsToDelete } });

    const today = new Date();
    const newTodos = todos.map(({ _id, title, topic, state }) => ({
      _id,
      title,
      topic,
      state,
      createdAt: today,
    }));
    const result = await Todo.insertMany(newTodos);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to move todos to today" });
  }
});

// 여러 Todo 추가
router.post("/", async (req, res) => {
  try {
    const todos = req.body;
    if (!Array.isArray(todos)) {
      return res.status(400).json({ message: "Expected an array of todos" });
    }
    const newTodos = await Todo.insertMany(todos);
    res.status(201).json(newTodos);
  } catch (error) {
    res.status(400).json({ message: "Error adding todos" });
  }
});

// Todo 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Todo 수정
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, state } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, state });
    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

module.exports = router;

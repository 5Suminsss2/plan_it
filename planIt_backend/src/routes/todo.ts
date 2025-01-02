import express from "express";
import Todo from "../models/Todo";

const router = express.Router();

// Todo 생성
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: "Failed to create todo" });
  }
});

// Todo 목록 조회
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

export default router;

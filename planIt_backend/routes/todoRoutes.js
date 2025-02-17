const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// 📌 GET 요청: 모든 Todo 가져오기
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// 📌 POST 요청: 새로운 Todo 추가
router.post("/todos", async (req, res) => {
  try {
    const { title, complete } = req.body;
    const newTodo = new Todo({ title, complete });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: "Error adding todo" });
  }
});

// 📌 DELETE 요청: Todo 삭제
router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // URL에서 id 가져오기
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// 📌 PUT 요청: Todo 데이터 내용 수정
router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // URL에서 id 가져오기
    const { title, complete } = req.body; // 요청 본문에서 변경할 값 가져오기

    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, complete });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo); // 업데이트된 Todo 반환
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

module.exports = router;

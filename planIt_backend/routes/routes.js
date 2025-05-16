const express = require("express");
const Todo = require("../models/Todo");
const Topic = require("../models/Topic");
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

// 📌 GET 요청: state가 pre인 모든 Todo 가져오기
router.get("/todos/pre", async (req, res) => {
  try {
    const preTodos = await Todo.find({ state: "pre" });
    res.status(200).json(preTodos);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// 📌 POST 요청: 새로운 Todo 추가
router.post("/todos", async (req, res) => {
  try {
    const { _id, title, topic, state } = req.body;
    const newTodo = new Todo({ _id, title, topic, state });
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
    const { title, state } = req.body; // 요청 본문에서 변경할 값 가져오기

    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, state });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo); // 업데이트된 Todo 반환
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// 📌 GET 요청: 모든 Todo 가져오기
router.get("/topic", async (req, res) => {
  try {
    const topic = await Topic.find();
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topic" });
  }
});

// 📌 POST 요청: 새로운 Todo 추가
router.post("/topic", async (req, res) => {
  console.log("enter");
  try {
    const { _id, title, color } = req.body;
    const newTopic = new Topic({ _id, title, color });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ message: "Error adding topic" });
  }
});

// 📌 DELETE 요청: 특정 Topic 삭제 (커스텀 _id 사용 시)
router.delete("/topic/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTopic = await Topic.findOneAndDelete({ _id: id });

    if (!deletedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic deleted successfully", deletedTopic });
  } catch (error) {
    res.status(500).json({ message: "Error deleting topic" });
  }
});

module.exports = router;

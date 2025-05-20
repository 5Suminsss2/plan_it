const express = require("express");
const Todo = require("../models/Todo");
const Topic = require("../models/Topic");
const router = express.Router();

// 📌 GET 요청: 모든 Todo 가져오기
router.get("/todos", async (req, res) => {
  try {
    const { date } = req.query;

    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);

      const todos = await Todo.find({
        createdAt: { $gte: start, $lte: end },
      });

      return res.json(todos);
    }

    const allTodos = await Todo.find();
    res.json(allTodos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 GET 요청: state가 pre인 모든 Todo 가져오기
// Todo : 오늘꺼 제외하고 받아오기
router.get("/todos/pre", async (req, res) => {
  try {
    const preTodos = await Todo.find({ state: "pre" });
    res.status(200).json(preTodos);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// 📌 POST 요청 : preTodo 오늘 할일로 바꾸기
router.post("/todos/move-to-today", async (req, res) => {
  try {
    const todos = req.body;

    // 1. 기존 todo 삭제
    const idsToDelete = todos.map((t) => t._id);
    await Todo.deleteMany({ _id: { $in: idsToDelete } });

    // 2. createdAt만 새로 설정해서 다시 저장
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
    console.error(error);
    res.status(500).json({ message: "Failed to move todos to today" });
  }
});

// 📌 POST 요청: 여러 개의 Todo 추가
router.post("/todos", async (req, res) => {
  try {
    const todos = req.body; // 배열로 들어온다고 가정

    if (!Array.isArray(todos)) {
      return res.status(400).json({ message: "Expected an array of todos" });
    }

    const newTodos = await Todo.insertMany(todos); // 한 번에 저장
    res.status(201).json(newTodos);
  } catch (error) {
    res.status(400).json({ message: "Error adding todos" });
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

const express = require("express");
const SharedPlan = require("../models/SharedPlan");
const router = express.Router();

let plans = [];

// 모든 계획 가져오기
router.get("/", (req, res) => {
  return res.json(plans);
});

// 계획 등록
router.post("/", (req, res) => {
  try {
    const { id, title, participants } = req.body;

    // 유효성 검사
    if (!id || !title || !Array.isArray(participants)) {
      return res.status(400).json({ message: "필수 정보가 부족합니다." });
    }

    const newPlan = { id, title, participants };
    plans.push(newPlan);

    res.status(201).json({ message: "계획이 추가되었습니다.", plan: newPlan });
  } catch (error) {
    console.error("계획 추가 중 에러:", error);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

module.exports = router;

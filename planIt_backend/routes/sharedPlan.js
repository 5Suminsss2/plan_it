const express = require("express");
const SharedPlan = require("../models/SharedPlan");
const router = express.Router();

let plans = [];

// 모든 계획 가져오기
router.get("/", async (req, res) => {
  try {
    const allPlans = await SharedPlan.find(); // 모든 계획 가져오기
    res.status(200).json(allPlans);
  } catch (error) {
    console.error("계획 조회 중 에러:", error);
    res.status(500).json({ message: "서버 에러가 발생했습니다.", error });
  }
});

// 계획 등록
// 계획 등록
router.post("/", async (req, res) => {
  try {
    const { id, title, participants } = req.body;

    if (!id || !title || !Array.isArray(participants)) {
      return res.status(400).json({ message: "필수 정보가 부족합니다." });
    }

    const newPlan = new SharedPlan({
      id,
      title,
      participants,
      doneList: [],
    });

    await newPlan.save();

    res.status(201).json({ message: "계획이 추가되었습니다.", plan: newPlan });
  } catch (error) {
    console.error("계획 추가 중 에러:", error);
    res.status(500).json({ message: "서버 에러가 발생했습니다.", error });
  }
});

// 특정 계획 가져오기
router.get("/:id", async (req, res) => {
  try {
    const planId = req.params.id;
    const plan = await SharedPlan.findOne({ id: planId });

    if (!plan) {
      return res.status(404).json({ message: "해당 계획을 찾을 수 없습니다." });
    }

    return res.status(200).json(plan);
  } catch (error) {
    console.error("계획 조회 중 에러:", error);
    return res.status(500).json({ message: "서버 에러", error });
  }
});

// 특정 계획에 한 일 추가
router.put("/:id/addDone", async (req, res) => {
  const { id } = req.params;
  const doneData = req.body;

  try {
    const updatedPlan = await SharedPlan.findOneAndUpdate(
      { id },
      { $push: { doneList: doneData } },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "해당 계획을 찾을 수 없습니다." });
    }

    res.json({
      message: "완료 항목이 추가되었습니다.",
      plan: updatedPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
});

module.exports = router;

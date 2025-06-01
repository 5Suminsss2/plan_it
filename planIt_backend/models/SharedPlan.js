const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    emoji: { type: String, required: true },
    color: { type: String, required: true },
  }
  //   { _id: false } // 개별 참가자에게 _id를 생성하지 않도록 설정
);

const SharedPlanSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    participants: { type: [ParticipantSchema], required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SharedPlan", SharedPlanSchema);

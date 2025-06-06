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

const DoneItemSchema = new mongoose.Schema({
  user: {
    value: { type: String, required: true }, // ex: "#ff0156"
    label: { type: String, required: true }, // ex: "🦄 김수냄"
  },
  hour: {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  minute: {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  subject: { type: String, required: true },
  correct: { type: String, required: true },
  total: { type: String, required: true },
  selectedDate: { type: String, require: true },
});

const SharedPlanSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    participants: { type: [ParticipantSchema], required: true },
    doneList: { type: [DoneItemSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SharedPlan", SharedPlanSchema);

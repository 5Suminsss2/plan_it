import SharedPlanCard from "../components/card/shardPlanCard";
import { PlanType } from "../types/shardPlan";

const plans: PlanType[] = [
  {
    id: 1,
    title: "단어 암기 챌린지",
    participants: [
      { name: "민수", emoji: "😀", color: "#FFB300" }, // 주황
      { name: "지영", emoji: "😎", color: "#29B6F6" }, // 파랑
      { name: "철수", emoji: "🧐", color: "#66BB6A" }, // 초록
      { name: "영희", emoji: "🤓", color: "#AB47BC" }, // 보라
    ],
  },
  {
    id: 2,
    title: "수학 문제 풀이",
    participants: [
      { name: "민수", emoji: "😀", color: "#FFB300" },
      { name: "지영", emoji: "😎", color: "#29B6F6" },
      { name: "철수", emoji: "🧐", color: "#66BB6A" },
    ],
  },
  {
    id: 3,
    title: "영어 회화 연습",
    participants: [
      { name: "민수", emoji: "😀", color: "#FFB300" },
      { name: "지영", emoji: "😎", color: "#29B6F6" },
      { name: "철수", emoji: "🧐", color: "#66BB6A" },
      { name: "영희", emoji: "🤓", color: "#AB47BC" },
      { name: "하늘", emoji: "🥳", color: "#FF7043" }, // 빨강/오렌지
    ],
  },
  {
    id: 4,
    title: "과학 실험",
    participants: [
      { name: "민수", emoji: "😀", color: "#FFB300" },
      { name: "지영", emoji: "😎", color: "#29B6F6" },
    ],
  },
  {
    id: 5,
    title: "독서 토론",
    participants: [
      { name: "민수", emoji: "😀", color: "#FFB300" },
      { name: "지영", emoji: "😎", color: "#29B6F6" },
      { name: "철수", emoji: "🧐", color: "#66BB6A" },
      { name: "영희", emoji: "🤓", color: "#AB47BC" },
    ],
  },
  // ...더 많은 카드 데이터
];

const sharedPlan = () => {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-6 justify-items-center cursor-pointer">
      {plans.map((plan) => (
        <SharedPlanCard
          key={plan.id}
          id={plan.id}
          title={plan.title}
          participants={plan.participants}
        />
      ))}
    </div>
  );
};

export default sharedPlan;

import { useEffect, useState } from "react";
import SharedPlanCard from "../components/card/shardPlanCard";
import AddSharedPlanModal from "../components/modals/AddSharedPlanModal";
import { PlanType } from "../types/shardPlan";
import { sharedPlanApi } from "../api/api";

const SharedPlanContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [plans, setPlans] = useState<PlanType[] | []>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddPlan = () => {
    setModalOpen(false);
  };

  // 데이터 todoList 가져오기
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await sharedPlanApi.getSharedPlan();
        setPlans(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    getTodos();
  }, [refreshTrigger]);

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-6 justify-items-center cursor-pointer">
      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600"
      >
        추가
      </button>
      {plans.map((plan) => (
        <SharedPlanCard
          key={plan.id}
          id={plan.id}
          title={plan.title}
          participants={plan.participants}
        />
      ))}
      <AddSharedPlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        handleAddPlan={handleAddPlan}
        setRefreshTrigger={setRefreshTrigger}
      />
    </div>
  );
};

export default SharedPlanContainer;

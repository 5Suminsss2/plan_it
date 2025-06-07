import { PlanType } from "../../types/shardPlan";
import { useNavigate } from "react-router-dom";

const SharedPlanCard = ({ id, title, participants }: PlanType) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sharedPlan/${id}`);
  };

  return (
    <div
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-40 bg-[#fafaff] rounded-2xl flex flex-col justify-between p-6
          shadow-md hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-lg font-semibold">
          {title}
        </div>
      </div>

      <div className="flex justify-end items-end mt-4">
        <div className="flex -space-x-3">
          {participants.map((data, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-lg"
              style={{ backgroundColor: data.color }}
            >
              {data.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedPlanCard;

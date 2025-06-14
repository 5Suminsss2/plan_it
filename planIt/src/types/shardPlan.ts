import { Dispatch, SetStateAction } from "react";

export interface participants {
  id: number;
  name: string;
  emoji: string;
  color: string;
}

export interface PlanType {
  id: number;
  title: string;
  participants: participants[];
}

export interface SharedPlanCardProps {
  title: string;
  participants: participants[];
}

export interface addSharedPlanModal {
  isOpen: boolean;
  onClose: () => void;
  handleAddPlan: () => void;
  setRefreshTrigger: Dispatch<SetStateAction<number>>;
}

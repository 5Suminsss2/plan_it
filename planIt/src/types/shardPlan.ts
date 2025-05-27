export interface participants {
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

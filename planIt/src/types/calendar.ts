import { Dispatch, SetStateAction } from "react";

export interface optionData {
  value: string;
  label: string;
}

export interface AddEventData {
  user: optionData;
  hour: optionData;
  minute: optionData;
  subject: string;
  correct: string;
  total: string;
}

export type EventType = {
  title: string;
  start: string;
  date: string | null;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    location: string;
    description: string;
    category: string;
  };
};

export interface addDoneModal {
  isOpen: boolean;
  onClose: () => void;
  setModalOpen: (data: boolean) => void;
  setRefreshTrigger: Dispatch<SetStateAction<number>>;
  selectedDate: string | null;
}

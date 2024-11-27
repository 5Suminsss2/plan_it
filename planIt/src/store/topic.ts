import { create } from "zustand";
import { Topic } from "../types/modal";

interface StoreState {
  topicList: Topic[] | []; // 토픽 리스트
  updateTopicList: (list: Topic[]) => void; // 토픽 리스트 업데이트 함수
}

const topicStore = create<StoreState>((set) => ({
  topicList: [],
  updateTopicList: (list) =>
    set((state) => {
      return { ...state, topicList: list };
    }),
}));

export default topicStore;

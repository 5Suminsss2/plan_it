import { useEffect, useState } from "react";
import TodoTopicModal from "../components/modals/TodoTopicModal";
import { TodoTopicModalContainerProps, Topic } from "../types/modal";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import topicStore from "../store/topic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { topicApi } from "../api/api";

const TodoTopicModalContainer = ({
  handleShowModal,
}: TodoTopicModalContainerProps) => {
  const { topicList, updateTopicList } = topicStore((state) => state);
  const [topicTitle, setTopicTitle] = useState(""); // 토픽 제목
  const [topicColor, setTopicColor] = useState(""); // 토픽 색상
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 토픽 제출 함수
  const handleTopicSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      // 토핑 입력 관련 validation
      if (_.isEmpty(topicTitle)) {
        return toast("토픽을 입력하라구~!");
      }
      if (_.isEmpty(topicColor)) {
        return toast("컬러 선택하라구~!");
      }

      const newTopicObj: Topic = {
        _id: uuidv4().replace(/-/g, ""),
        title: topicTitle,
        color: topicColor,
      };
      await topicApi.addTopic(newTopicObj);
      setRefreshTrigger((prev) => prev + 1); // topic 데이터 리프레시

      setTopicTitle("");
      setTopicColor("");
    }
  };

  // 새로운 토픽 지정 함수
  const handleTopicTitle = (title: string) => {
    setTopicTitle(title);
  };

  // 토픽 삭제 함수
  // todo: topic 삭제 api함수 만들기
  const handleRemoveTopic = async (id: string) => {
    await topicApi.removeTopic(id);
    setRefreshTrigger((prev) => prev + 1); // topic 데이터 리프레시
  };

  // topic 데이터 가져오기
  useEffect(() => {
    const getTopic = async () => {
      try {
        const data = await topicApi.getTopic();
        updateTopicList(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    getTopic();
  }, [refreshTrigger, updateTopicList]);

  return (
    <>
      <TodoTopicModal
        handleShowModal={handleShowModal}
        handleTopicSubmit={handleTopicSubmit}
        handleTopicTitle={handleTopicTitle}
        handleRemoveTopic={handleRemoveTopic}
        topicTitle={topicTitle}
        topicList={topicList}
        topicColor={topicColor}
        setTopicColor={setTopicColor}
      />
      <ToastContainer position="top-center" />
    </>
  );
};

export default TodoTopicModalContainer;

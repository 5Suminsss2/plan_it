import { useState } from "react";
import PreTodoModal from "../components/modals/PreTodoModal";
import { TodoTopicModalContainerProps, Topic } from "../types/modal";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import topicStore from "../store/topic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreTodoModalContainer = ({
  handleShowModal,
}: TodoTopicModalContainerProps) => {
  const { topicList, updateTopicList } = topicStore((state) => state);
  const [topicTitle, setTopicTitle] = useState(""); // 토픽 제목
  const [topicColor, setTopicColor] = useState(""); // 토픽 색상

  // 토픽 제출 함수
  const handleTopicSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 토핑 입력 관련 validation
      if (_.isEmpty(topicTitle)) {
        return toast("토픽을 입력하라구~!");
      }
      if (_.isEmpty(topicColor)) {
        return toast("컬러 선택하라구~!");
      }

      const newTopicObj: Topic = {
        id: uuidv4(),
        title: topicTitle,
        color: topicColor,
      };
      updateTopicList([...topicList, newTopicObj]);
      setTopicTitle("");
      setTopicColor("");
    }
  };

  // 새로운 토픽 지정 함수
  const handleTopicTitle = (title: string) => {
    setTopicTitle(title);
  };

  // 토픽 삭제 함수
  const handleRemoveTopic = (id: string) => {
    const updateTopic = _.remove(topicList, (n) => {
      return n.id !== id;
    });
    updateTopicList(updateTopic);
  };

  return (
    <>
      <PreTodoModal
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

export default PreTodoModalContainer;

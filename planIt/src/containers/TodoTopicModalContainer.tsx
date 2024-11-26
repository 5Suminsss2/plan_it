import { useState } from "react";
import TodoTopicModal from "../components/modals/TodoTopicModal";
import { TodoTopicModalContainerProps, Topic } from "../types/modal";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const TodoTopicModalContainer = ({
  handleShowModal,
}: TodoTopicModalContainerProps) => {
  const [topicList, setTopicList] = useState<Topic[]>([]);
  const [newTopic, setNewTopic] = useState<string>("");

  // 토픽 제출 함수
  const handleTopicSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && _.isEmpty(newTopic)) {
      return alert("토픽을 입력하라구~!");
    }

    if (e.key === "Enter") {
      const newTopicObj: Topic = {
        id: uuidv4(),
        title: newTopic,
        color: "#f94c4c",
      };
      setTopicList([...topicList, newTopicObj]);
      setNewTopic("");
    }
  };

  // 새로운 토픽 지정 함수
  const handleNewTopicSubmit = (value: string) => {
    setNewTopic(value);
  };

  // 할 일 목록 삭제 함수
  const handleRemoveTopic = (id: string) => {
    const test = _.remove(topicList, (n) => {
      return n.id !== id;
    });
    setTopicList(test);
  };

  return (
    <TodoTopicModal
      handleShowModal={handleShowModal}
      handleTopicSubmit={handleTopicSubmit}
      handleNewTopicSubmit={handleNewTopicSubmit}
      handleRemoveTopic={handleRemoveTopic}
      newTopic={newTopic}
      topicList={topicList}
    />
  );
};

export default TodoTopicModalContainer;

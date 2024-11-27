import { useState } from "react";
import TodoTopicModal from "../components/modals/TodoTopicModal";
import { TodoTopicModalContainerProps, Topic } from "../types/modal";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const TodoTopicModalContainer = ({
  handleShowModal,
}: TodoTopicModalContainerProps) => {
  const [topicList, setTopicList] = useState<Topic[]>([]); // 총 토픽 리스트
  const [topicTitle, setTopicTitle] = useState(""); // 토픽 제목
  const [topicColor, setTopicColor] = useState(""); // 토픽 색상

  // 토픽 제출 함수
  const handleTopicSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 토핑 입력 관련 validation
      if (_.isEmpty(topicTitle)) {
        return alert("토픽을 입력하라구~!");
      }
      if (_.isEmpty(topicColor)) {
        return alert("컬러 선택하라구~!");
      }

      const newTopicObj: Topic = {
        id: uuidv4(),
        title: topicTitle,
        color: topicColor,
      };
      setTopicList([...topicList, newTopicObj]);
      setTopicTitle("");
      setTopicColor("");
    }

    // if (e.key === "Enter") {
    //   const newTopicObj: Topic = {
    //     id: uuidv4(),
    //     title: topicTitle,
    //     color: topicColor,
    //   };
    //   setTopicList([...topicList, newTopicObj]);
    //   setTopicTitle("");
    //   setTopicColor("");
    // }
  };

  // 새로운 토픽 지정 함수
  const handleTopicTitle = (title: string) => {
    setTopicTitle(title);
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
      handleTopicTitle={handleTopicTitle}
      handleRemoveTopic={handleRemoveTopic}
      topicTitle={topicTitle}
      topicList={topicList}
      topicColor={topicColor}
      setTopicColor={setTopicColor}
    />
  );
};

export default TodoTopicModalContainer;

import { useEffect, useState } from "react";
import PreTodoModal from "../components/modals/PreTodoModal";
import { TodoTopicModalContainerProps } from "../types/modal";
import _ from "lodash";
import topicStore from "../store/topic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { todosApi } from "../api/api";
import { Todo } from "../types/todo";

const PreTodoModalContainer = ({
  handleShowModal,
}: TodoTopicModalContainerProps) => {
  const { topicList } = topicStore((state) => state);
  const [preTodos, setPreTodos] = useState<Todo[]>([]); // 상태값이 pre인 todo 데이터
  const [checkedItems, setCheckedItems] = useState<Todo[]>([]);

  // 전체 체크 여부
  const allChecked = preTodos.every((todo) =>
    checkedItems.some((item) => item._id === todo._id)
  );

  // 체크 함수
  const toggleCheck = (item: Todo) => {
    setCheckedItems(
      (prev) =>
        prev.find((i) => i._id === item._id)
          ? prev.filter((i) => i._id !== item._id) // 이미 있으면 제거
          : [...prev, item] // 없으면 추가
    );
  };

  // 전체 체크 함수
  const toggleAll = () => {
    if (allChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(preTodos);
    }
  };

  // 오늘 TODOS에 PRE TODO 추가하기
  const handleApplyPreTodos = (checkedItems: Todo[]) => {
    console.log("야호~", checkedItems);
  };

  // 데이터 todoList 가져오기
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await todosApi.getPreTodos();
        setPreTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    getTodos();
  }, []);

  return (
    <>
      <PreTodoModal
        handleShowModal={handleShowModal}
        topicList={topicList}
        handleApplyPreTodos={handleApplyPreTodos}
        preTodos={preTodos}
        checkedItems={checkedItems}
        allChecked={allChecked}
        toggleCheck={toggleCheck}
        toggleAll={toggleAll}
      />
      <ToastContainer position="top-center" />
    </>
  );
};

export default PreTodoModalContainer;

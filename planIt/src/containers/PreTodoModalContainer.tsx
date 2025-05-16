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
  const [checkedIds, setCheckedIds] = useState<string[]>([]); // 체크박스 상태

  // 전체 체크 여부
  const allChecked =
    checkedIds.length === preTodos.length && preTodos.length > 0;

  // 체크 함수
  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 전체 체크 함수
  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds([]);
    } else {
      setCheckedIds(preTodos.map((todo) => todo._id));
    }
  };

  // 오늘 TODOS에 PRE TODO 추가하기
  const handleApplyPreTodos = (checkedIds) => {
    console.log("야호~", checkedIds);
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
        checkedIds={checkedIds}
        allChecked={allChecked}
        toggleCheck={toggleCheck}
        toggleAll={toggleAll}
      />
      <ToastContainer position="top-center" />
    </>
  );
};

export default PreTodoModalContainer;

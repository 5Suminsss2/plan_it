import { useEffect, useState } from "react";
import PreTodoModal from "../components/modals/PreTodoModal";
import { TodoTopicModalContainerProps } from "../types/modal";
import topicStore from "../store/topic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { todosApi } from "../api/api";
import { Todo } from "../types/todo";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const PreTodoModalContainer = ({
  handleShowModal,
}: TodoTopicModalContainerProps) => {
  const { topicList } = topicStore((state) => state);
  const [preTodos, setPreTodos] = useState<Todo[]>([]); // 상태값이 pre인 todo 데이터
  const [checkedItems, setCheckedItems] = useState<Todo[]>([]);
  const navigate = useNavigate();

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
  const handleApplyPreTodos = async (checkedItems: Todo[]) => {
    if (_.isEmpty(checkedItems)) {
      return toast("추가할 todo를 선택해주세요");
    }
    try {
      await todosApi.addPreTodos(checkedItems); // 성공하면 다음 줄 실행됨
      navigate(0);
    } catch (error) {
      toast("PRE TODO 추가 실패");
      console.log("PRE TODO 추가 실패 error : ", error);
    }
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

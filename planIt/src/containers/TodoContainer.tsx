import { useEffect, useState } from "react";
import TodoBox from "../components/todo/TodoBox";
import dayjs from "dayjs";
import { Todo } from "../types/todo";
import { v4 as uuidv4 } from "uuid";
import topicStore from "../store/topic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { todosApi, topicApi } from "../api/api";

const TodoContainer = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [modals, setModals] = useState<Record<string, boolean>>({});
  const { topicList, updateTopicList } = topicStore((state) => state);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 현재 날짜
  const currentDate = dayjs().format("YY.MM.DD");

  // 할일목록 제출 함수
  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newTodo === "") {
        return toast("할 일을 입력하라구~!");
      }

      if (selectedTopic === "") {
        return toast("토픽을 선택하라구~!");
      }

      const newTodoObj: Todo = {
        _id: uuidv4().replace(/-/g, ""),
        title: newTodo,
        topic: selectedTopic,
        state: "pre",
      };
      setNewTodo("");
      setSelectedTopic("");

      await todosApi.addTodo(newTodoObj);
      setRefreshTrigger((prev) => prev + 1); // 데이터 todolist 리프레시
    }
  };

  // 새로운 할일 목록 지정 함수
  const handleNewTodo = (value: string) => {
    setNewTodo(value);
  };

  // 새로운 토픽 지정 함수
  const handleSelectedTopic = (value: string) => {
    setSelectedTopic(value);
  };

  // 할 일 목록 삭제 함수
  const handleRemoveTodo = async (id: string) => {
    await todosApi.deleteTodo(id);
    // Todo: delete 성공했을 때 trigger 반영하기
    setRefreshTrigger((prev) => prev + 1); // 데이터 todolist 리프레시
  };

  // 할 일 목록 state 업데이트 함수
  const handleCompleteTodo = async (id: string, state: string) => {
    await todosApi.updateTodo(id, { state: state });
    setRefreshTrigger((prev) => prev + 1); // 데이터 todolist 리프레시
  };

  // 모달 노출 여부 제어 함수
  const handleShowModal = (modalId: string, isOpen: boolean) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: isOpen,
    }));
  };

  // - todolist를 같은 topic으로 분류하기
  const groupByTopic = (arr: Todo[]): Record<string, Todo[]> => {
    return arr.reduce((groups: Record<string, Todo[]>, item) => {
      (groups[item.topic] = groups[item.topic] || []).push(item);
      return groups;
    }, {});
  };

  // topic으로 그룹화된 todolist
  const groupedData = groupByTopic(todoList);

  useEffect(() => {
    setSelectedTopic("");
  }, [topicList]);

  // 데이터 todoList 가져오기
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await todosApi.getTodos();
        setTodoList(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    getTodos();
  }, [refreshTrigger]);

  // topic 가져오기
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
  }, [updateTopicList]);

  return (
    <>
      <TodoBox
        currentDate={currentDate}
        handleSubmit={handleSubmit}
        handleNewTodo={handleNewTodo}
        handleSelectedTopic={handleSelectedTopic}
        handleRemoveTodo={handleRemoveTodo}
        handleCompleteTodo={handleCompleteTodo}
        handleShowModal={handleShowModal}
        todoList={todoList}
        topicList={topicList}
        newTodo={newTodo}
        modals={modals}
        selectedTopic={selectedTopic}
        groupedData={groupedData}
      />
      <ToastContainer position="top-center" />
    </>
  );
};

export default TodoContainer;

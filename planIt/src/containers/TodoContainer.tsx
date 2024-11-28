import { useEffect, useState } from "react";
import TodoBox from "../components/todo/TodoBox";
import dayjs from "dayjs";
import { Todo } from "../types/todo";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import topicStore from "../store/topic";

const TodoContainer = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [modals, setModals] = useState<Record<string, boolean>>({});
  const { topicList } = topicStore((state) => state);

  // 현재 날짜
  const currentDate = dayjs().format("YY.MM.DD");

  // 할일목록 제출 함수
  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newTodo === "") {
        return alert("할 일을 입력하라구~!");
      }

      if (selectedTopic === "") {
        return alert("토픽을 선택하라구~!");
      }

      const newTodoObj: Todo = {
        id: uuidv4(),
        title: newTodo,
        topic: selectedTopic,
        state: "pre",
      };
      setTodoList([...todoList, newTodoObj]);
      setNewTodo("");
      setSelectedTopic("");
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
  const handleRemoveTodo = (id: string) => {
    const test = _.remove(todoList, (n) => {
      return n.id !== id;
    });
    setTodoList(test);
  };

  // 할 일 목록 state 업데이트 함수
  const handleCompleteTodo = (id: string, state: string) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, state: state } : todo
    );
    setTodoList(updatedTodoList);
  };

  // 모달 노출 여부 제어 함수
  const handleShowModal = (modalId: string, isOpen: boolean) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: isOpen,
    }));
  };

  useEffect(() => {
    setSelectedTopic("");
  }, [topicList]);

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
      />
    </>
  );
};

export default TodoContainer;

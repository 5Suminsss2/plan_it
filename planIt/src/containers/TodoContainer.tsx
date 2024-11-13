import { useState } from "react";
import TodoBox from "../components/todo/TodoBox";
import dayjs from "dayjs";
import { Todo } from "../types/todo";

const TodoContainer = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  // 현재 날짜
  const currentDate = dayjs().format("YY.MM.DD");

  // 할일목록 제출 함수
  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo === "") {
      return alert("할 일을 입력하라구~!");
    }

    if (e.key === "Enter") {
      const newTodoObj: Todo = {
        id: dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        title: newTodo,
        completed: false,
      };
      setTodoList([...todoList, newTodoObj]);
      setNewTodo("");
    }
  };

  // 새로운 할일 목록 지정 함수
  const handleNewSubmit = (value: string) => {
    setNewTodo(value);
  };

  return (
    <>
      <TodoBox
        currentDate={currentDate}
        handleSubmit={handleSubmit}
        handleNewSubmit={handleNewSubmit}
        todoList={todoList}
        newTodo={newTodo}
      />
    </>
  );
};

export default TodoContainer;

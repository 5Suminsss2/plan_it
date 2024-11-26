import { useState } from "react";
import TodoBox from "../components/todo/TodoBox";
import dayjs from "dayjs";
import { Todo } from "../types/todo";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

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
        id: uuidv4(),
        title: newTodo,
        state: "pre",
      };
      setTodoList([...todoList, newTodoObj]);
      setNewTodo("");
    }
  };

  // 새로운 할일 목록 지정 함수
  const handleNewSubmit = (value: string) => {
    setNewTodo(value);
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

  return (
    <>
      <TodoBox
        currentDate={currentDate}
        handleSubmit={handleSubmit}
        handleNewSubmit={handleNewSubmit}
        handleRemoveTodo={handleRemoveTodo}
        handleCompleteTodo={handleCompleteTodo}
        todoList={todoList}
        newTodo={newTodo}
      />
    </>
  );
};

export default TodoContainer;

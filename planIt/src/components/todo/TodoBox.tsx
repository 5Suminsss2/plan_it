import { TodoBoxProps } from "../../types/todo";
import "./TodoBox.css";
import TodoLists from "./TodoLists";

const TodoBox = ({
  currentDate,
  handleSubmit,
  handleNewSubmit,
  handleRemoveTodo,
  handleCompleteTodo,
  todoList,
  newTodo,
}: TodoBoxProps) => {
  return (
    <div className="todo-box">
      <section className="flex justify-between px-3.5 py-2">
        <div className="text-xl font-bold">{currentDate}</div>
        <div className="flex space-x-5">
          <div>못한 todo 팝업</div>
          <div>루틴팝업</div>
        </div>
      </section>
      <div className="flex justify-center items-center m-3">
        <input
          type="text"
          value={newTodo}
          className="input-box"
          onChange={(e) => {
            handleNewSubmit(e.target.value);
          }}
          onKeyDown={handleSubmit}
        />
      </div>
      <TodoLists
        todoList={todoList}
        handleRemoveTodo={handleRemoveTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
    </div>
  );
};

export default TodoBox;

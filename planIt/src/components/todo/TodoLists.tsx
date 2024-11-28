import { todoStates } from "../../common";
import { TodoListsProps } from "../../types/todo";
import "./TodoBox.css";
import _ from "lodash";

const TodoLists = ({
  todoList,
  handleRemoveTodo,
  handleCompleteTodo,
}: TodoListsProps) => {
  return (
    <section>
      {!_.isEmpty(todoList) ? (
        todoList.map((res) => {
          const todo = res.title;
          return (
            <div
              key={res.id}
              className="flex justify-between items-center bg-[#f0f0f5] px-3.5 py-2 m-3 mt-5 rounded-lg shadow-lg font-bold"
            >
              <select
                className="select select-bordered select-sm"
                onChange={(e) => {
                  handleCompleteTodo(res.id, e.target.value);
                }}
              >
                {todoStates.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div>{todo}</div>
              <div
                onClick={() => {
                  handleRemoveTodo(res.id);
                }}
                className="hover:cursor-pointer"
              >
                ✖
              </div>
            </div>
          );
        })
      ) : (
        <span className="inline-block bg-[#f94c4c] text-[#ffffff] font-bold px-3.5 py-2 m-3 mt-6  rounded-lg shadow-lg cursor-default">
          할 일을 추가해주라구~!
        </span>
      )}
    </section>
  );
};

export default TodoLists;

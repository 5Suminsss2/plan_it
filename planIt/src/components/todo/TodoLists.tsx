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
              className="flex justify-between bg-[#f8f8fb] px-3.5 py-2 m-3 mt-5 bg-white rounded-lg shadow-lg font-bold"
            >
              <label>
                <input
                  type="checkbox"
                  checked={res.completed}
                  onChange={() => {
                    handleCompleteTodo(res.id);
                  }}
                />
              </label>
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
        <span className="inline-block bg-[#f94c4c] text-[#000] font-bold px-3.5 py-2 m-3 mt-6 bg-white rounded-lg shadow-lg">
          할 일을 추가해주라구~!
        </span>
      )}
    </section>
  );
};

export default TodoLists;

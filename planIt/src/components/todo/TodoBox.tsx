import { TodoBoxProps } from "../../types/todo";
import "./TodoBox.css";
import _ from "lodash";

const TodoBox = ({
  currentDate,
  handleSubmit,
  handleNewSubmit,
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
      <section>
        {!_.isEmpty(todoList) ? (
          todoList.map((res) => {
            const todo = res.title;
            return (
              <div className="bg-todoList-none px-3.5 py-2 m-3 mt-8 bg-white rounded-lg shadow-lg font-bold">
                {todo}
              </div>
            );
          })
        ) : (
          <span className="inline-block bg-warning text-[#ffffff] font-bold px-3.5 py-2 m-3 mt-6 bg-white rounded-lg shadow-lg">
            할 일을 추가해주라구~!
          </span>
        )}
      </section>
    </div>
  );
};

export default TodoBox;

import { TodoBoxProps } from "../../types/todo";
import "./TodoBox.css";
import TodoLists from "./TodoLists";
import TodoTopicModalContainer from "../../containers/TodoTopicModalContainer";

const TodoBox = ({
  currentDate,
  handleSubmit,
  handleNewSubmit,
  handleRemoveTodo,
  handleCompleteTodo,
  handleShowModal,
  todoList,
  newTodo,
  modals,
}: TodoBoxProps) => {
  return (
    <div className="todo-box">
      <section className="flex justify-between px-3.5 py-2">
        <div className="text-xl font-bold">{currentDate}</div>
        <div className="flex space-x-5">
          <button
            className="btn btn-active btn-neutral"
            onClick={() => handleShowModal("modal_topic", true)}
          >
            토픽추가
          </button>
          <button className="btn btn-active btn-neutral">못한 todo 팝업</button>
          <button className="btn btn-active btn-neutral">루틴 팝업</button>
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
      {modals.modal_topic && (
        <TodoTopicModalContainer handleShowModal={handleShowModal} />
      )}
    </div>
  );
};

export default TodoBox;

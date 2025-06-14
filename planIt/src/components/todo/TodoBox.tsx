import { TodoBoxProps } from "../../types/todo";
import "./TodoBox.css";
import TodoLists from "./TodoLists";
import TodoTopicModalContainer from "../../containers/TodoTopicModalContainer";
import PreTodoModalContainer from "../../containers/PreTodoModalContainer";
import { useNavigate } from "react-router-dom";

const TodoBox = ({
  selectedDate,
  setSelectedDate,
  handleSubmit,
  handleNewTodo,
  handleSelectedTopic,
  handleRemoveTodo,
  handleCompleteTodo,
  handleShowModal,
  todoList,
  topicList,
  newTodo,
  modals,
  selectedTopic,
  groupedData,
}: TodoBoxProps) => {
  const navigate = useNavigate();
  return (
    <div className="todo-box">
      <section className="flex justify-between px-3.5 py-2">
        <div className="text-xl font-bold">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="flex space-x-5">
          <button
            className="btn btn-active btn-neutral"
            onClick={() => handleShowModal("modal_topic", true)}
          >
            토픽추가
          </button>
          <button
            className="btn btn-active btn-neutral"
            onClick={() => handleShowModal("modal_preTodo", true)}
          >
            못한 todo 팝업
          </button>
          <button
            className="btn btn-active btn-neutral"
            // onClick={() => handleShowModal("modal_routine", true)}
            onClick={() => navigate("/progressCalendar")}
          >
            루틴 팝업
          </button>
        </div>
      </section>
      <div className="flex justify-center items-center m-3">
        <select
          className="select select-bordered select-sm h-[2.5rem] w-[9rem] mr-2"
          onChange={(e) => {
            handleSelectedTopic(e.target.value);
          }}
          value={selectedTopic}
        >
          <option>토픽 선택</option>
          {topicList.map((option) => (
            <option key={option._id} value={option.title}>
              {option.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newTodo}
          className="input-box"
          onChange={(e) => {
            handleNewTodo(e.target.value);
          }}
          onKeyDown={handleSubmit}
        />
      </div>
      <TodoLists
        todoList={todoList}
        topicList={topicList}
        groupedData={groupedData}
        handleRemoveTodo={handleRemoveTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
      {modals.modal_topic && (
        <TodoTopicModalContainer handleShowModal={handleShowModal} />
      )}
      {modals.modal_preTodo && (
        <PreTodoModalContainer handleShowModal={handleShowModal} />
      )}
      {modals.modal_notTodo && (
        <TodoTopicModalContainer handleShowModal={handleShowModal} />
      )}
    </div>
  );
};

export default TodoBox;

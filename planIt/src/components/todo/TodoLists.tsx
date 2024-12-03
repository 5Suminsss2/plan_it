import { todoStates } from "../../common";
import { TodoListsProps } from "../../types/todo";
import "./TodoBox.css";
import _ from "lodash";

const TodoLists = ({
  todoList,
  topicList,
  groupedData,
  handleRemoveTodo,
  handleCompleteTodo,
}: TodoListsProps) => {
  return (
    <section>
      {!_.isEmpty(todoList) ? (
        Object.entries(groupedData).map(([topic, items]) => (
          <div key={topic} className="mb-[20px]">
            <div className="flex justify-start px-3.5 ">
              <div
                className="px-3.5 p-1 font-bold rounded-md shadow-md inline-block min-w-[50px]"
                style={{
                  backgroundColor:
                    `${_.find(topicList, { title: topic })?.color}` || "#fff",
                }}
              >
                {topic}
              </div>
            </div>
            <ul>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-[#f0f0f5] px-3.5 py-2 m-3 mt-5 rounded-lg shadow-lg font-bold"
                >
                  <select
                    className="select select-bordered select-sm"
                    onChange={(e) => {
                      handleCompleteTodo(item.id, e.target.value);
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
                  <div>{item.title}</div>
                  <div
                    onClick={() => {
                      handleRemoveTodo(item.id);
                    }}
                    className="hover:cursor-pointer"
                  >
                    ✖
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <span className="inline-block bg-[#f94c4c] text-[#ffffff] font-bold px-3.5 py-2 m-3 mt-6  rounded-lg shadow-lg cursor-default">
          할 일을 추가해주라구~!
        </span>
      )}
    </section>
  );
};

export default TodoLists;

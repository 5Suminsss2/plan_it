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
              {items
                .slice() // 원본 배열 변경 방지
                .sort((todo) => (todo.state === "completed" ? 1 : -1)) // completed를 아래로
                .map((item) => (
                  <div
                    key={item.id}
                    className={
                      "flex justify-between items-center px-3.5 py-2 m-3 mt-5 rounded-lg shadow-lg"
                    }
                    style={{
                      backgroundColor:
                        item.state === "completed" ? "#ccc" : "#f0f0f5",
                    }}
                  >
                    <select
                      className="select select-bordered select-sm"
                      value={item.state} // 현재 상태를 반영
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
                    <div
                      style={{
                        fontWeight: item.state === "completed" ? "300" : "700",
                        textDecoration:
                          item.state === "completed" ? "line-through" : "",
                      }}
                    >
                      {item.title}
                    </div>
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

import { PreTodosModalProps } from "../../types/modal";
import ModalHeader from "./ModalHeader";
import _ from "lodash";

const PreTodoModal = ({
  handleShowModal,
  handleApplyPreTodos,
  preTodos,
  topicList,
  allChecked,
  checkedItems,
  toggleCheck,
  toggleAll,
}: PreTodosModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box h-[50vh] w-[90%] max-w-xl overflow-y-auto">
        <ModalHeader
          handleShowModal={handleShowModal}
          title="끝내지 못한 Todos"
          modalId="modal_preTodo"
        />

        <div className="modal-action flex-col space-y-4 w-full">
          {/* 전체 체크 */}
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={toggleAll}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm text-gray-700">전체 선택</span>
          </label>

          {/* 항목 리스트 */}
          <div className="flex flex-col space-y-3">
            {preTodos.map((res) => (
              <label key={res._id} className="group cursor-pointer">
                <div
                  style={{ backgroundColor: "rgb(240, 240, 245)" }}
                  className="rounded-xl px-5 py-4 text-gray-800 shadow-md flex items-center space-x-3 w-full transition group-hover:bg-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.some((i) => i._id === res._id)}
                    onChange={() => toggleCheck(res)}
                    className="checkbox checkbox-sm bg-white border-gray-400"
                  />
                  <span
                    className="rounded-md p-[3px]"
                    style={{
                      backgroundColor:
                        `${_.find(topicList, { title: res.topic })?.color}` ||
                        "#fff",
                    }}
                  >
                    {res.topic}
                  </span>
                  <span className="text-base font-medium">{res.title}</span>
                </div>
              </label>
            ))}
          </div>

          {/* 버튼 */}
          <div
            className="flex justify-center items-center"
            onClick={() => {
              handleApplyPreTodos(checkedItems);
            }}
          >
            <div className="px-3 py-2 mt-5 bg-metal bg-opacity-50 w-fit text-white rounded cursor-pointer">
              오늘 TODO에 추가하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreTodoModal;

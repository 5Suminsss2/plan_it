import { TodoTopicModalProps } from "../../types/modal";

const TodoTopicModal = ({
  handleShowModal,
  handleTopicSubmit,
  handleNewTopicSubmit,
  handleRemoveTopic,
  newTopic,
  topicList,
}: TodoTopicModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box">
        <h3 className="font-bold text-lg">토픽 추가</h3>

        <div className="modal-action flex-col">
          <input
            type="text"
            value={newTopic}
            placeholder="원하는 토핑 대신 토픽을 입력해주세요!"
            className="input input-bordered input-sm w-full"
            onChange={(e) => {
              handleNewTopicSubmit(e.target.value);
            }}
            onKeyDown={handleTopicSubmit}
          />
          <div className="flex mt-3 flex-wrap whitespace-normal ">
            {topicList?.map((res) => {
              return (
                <div
                  key={res.id}
                  className={`flex relative group bg-[${res.color}] p-2 m-2 rounded-md cursor-pointer font-bold`}
                >
                  <p>{res.title}</p>
                  <button
                    onClick={() => {
                      handleRemoveTopic(res.id);
                    }}
                    className="w-7 h-7 ml-2 items-center justify-center bg-[#ffffff] rounded-full hover:bg-red-700 focus:outline-none hidden group-hover:block"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <form method="dialog" className="mt-10">
            <button
              className="btn"
              onClick={() => {
                handleShowModal("modal_topic", false);
              }}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoTopicModal;

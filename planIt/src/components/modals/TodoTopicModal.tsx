import { TodoTophicModalProps } from "../../types/modal";

const TodoTopicModal = ({ handleShowModal }: TodoTophicModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box">
        <h3 className="font-bold text-lg">토픽 추가</h3>
        <p className="py-4">토핑 대신 토픽을 추가해보세요!</p>
        <div className="modal-action">
          <form method="dialog">
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

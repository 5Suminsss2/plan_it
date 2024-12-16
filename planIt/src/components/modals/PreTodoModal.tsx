import { TodoTopicModalProps } from "../../types/modal";
import ModalHeader from "./ModalHeader";

const PreTodoModal = ({ handleShowModal }: TodoTopicModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="modal-box h-[50vh]">
        <ModalHeader
          handleShowModal={handleShowModal}
          title="끝내지 못한 Todos"
          modalId="modal_preTodo"
        />

        <div className="modal-action flex-col ">
          <div className="flex items-center space-x-3"></div>
        </div>
      </div>
    </div>
  );
};

export default PreTodoModal;

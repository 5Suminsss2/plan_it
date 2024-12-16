import { ModalHeaderProps } from "../../types/modal";

const ModalHeader = ({ handleShowModal, title, modalId }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between">
      <h3 className="font-bold text-lg mt-2">{title}</h3>
      <form method="dialog">
        <button
          className="btn rounded-full bg-[#f8f9fb] p-3 shadow-md hover:shadow-lg active:shadow-md transition-shadow"
          onClick={() => {
            handleShowModal(modalId, false);
          }}
        >
          ✖️
        </button>
      </form>
    </div>
  );
};

export default ModalHeader;

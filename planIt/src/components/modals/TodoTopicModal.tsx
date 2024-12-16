import { TodoTopicModalProps } from "../../types/modal";
import { HexColorPicker } from "react-colorful";
import _ from "lodash";
import ModalHeader from "./ModalHeader";

const TodoTopicModal = ({
  handleShowModal,
  handleTopicSubmit,
  handleTopicTitle,
  handleRemoveTopic,
  topicTitle,
  topicList,
  topicColor,
  setTopicColor,
}: TodoTopicModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="modal-box h-[50vh]">
        <ModalHeader
          handleShowModal={handleShowModal}
          title="토픽 추가"
          modalId="modal_topic"
        />

        <div className="modal-action flex-col ">
          <div className="flex items-center space-x-3">
            <details className="dropdown">
              <summary className="btn m-1 rounded-full bg-[#f8f9fb] p-3 shadow-md hover:shadow-lg active:shadow-md transition-shadow">
                🎨
              </summary>
              <div className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <HexColorPicker
                  color={topicColor}
                  onChange={setTopicColor}
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                />
              </div>
            </details>
            <input
              type="text"
              value={topicTitle}
              placeholder="입력 후 엔터를 눌러주세요!"
              className="input input-bordered input-sm w-full"
              onChange={(e) => {
                handleTopicTitle(e.target.value);
              }}
              onKeyDown={handleTopicSubmit}
            />
          </div>

          {_.isEmpty(topicList) ? (
            <div className="h-[200px] flex items-center justify-center font-bold">
              원하는 토핑 대신 토픽을 입력해주세요!
            </div>
          ) : (
            <div className="flex mt-3 flex-wrap whitespace-normal w-[100%]">
              {topicList?.map((res) => {
                return (
                  <div
                    key={res.id}
                    className={
                      "flex relative group p-2 m-2 rounded-md cursor-pointer font-semibold h-[40px]"
                    }
                    style={{
                      backgroundColor: `${res.color}`,
                    }}
                    /* (Notice) : tailwind로 동적할당을 하려면 변수를 설정해서 그 안에 원하는 값을 넣고 가져오는 방향으로 구현할 수 있음
                     이는 원하는 값이 한정되어 있을 때 사용하기 좋은 기능이지만, 
                     내가 원하는 기능은 사용자가 색상을 무작위로 선택한 색상값을 가져와야하는 경우이기 때문에 이와 맞지 않다고 판단하여 
                     inline style을 사용하기로 결정함 */
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoTopicModal;

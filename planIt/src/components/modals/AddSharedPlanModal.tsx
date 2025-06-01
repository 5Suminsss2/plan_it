import { useState } from "react";
import ModalHeader from "./ModalHeader";
import { participants, addSharedPlanModal } from "../../types/shardPlan";
import EmojiPicker from "emoji-picker-react";

const AddSharedPlanModal = ({
  isOpen,
  onClose,
  handleAddPlan,
}: addSharedPlanModal) => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<participants[] | []>([]);
  const [user, setUser] = useState({ name: "", color: "#000000", emoji: "" });
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = () => {
    if (!user.name || !user.emoji) return;

    const newUser: participants = {
      id: Date.now(),
      ...user,
    };

    setUsers((prev) => [...prev, newUser]);
    setUser({ name: "", color: "#000000", emoji: "" });
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  if (!isOpen) return null;

  // 플랜 저장 함수
  const handleSubmit = async () => {
    const data = {
      id: Date.now(),
      title: title,
      participants: users,
    };
    setTitle("");
    setUser({ name: "", color: "#000000", emoji: "" });
    setUsers([]);

    // await todosApi.addTodo([newTodoObj]);
    // setRefreshTrigger((prev) => prev + 1); // 데이터 todolist 리프레시
    handleAddPlan(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="modal-box h-[45vh] flex flex-col">
        {/* ModalHeader는 좌측 정렬(기본) */}
        <ModalHeader
          handleShowModal={onClose}
          title="추가하기"
          modalId="modal_sharedPlan"
        />

        {/* 중앙 정렬이 필요한 부분만 flex-grow로 감싸기 */}
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="mt-8 mb-2 flex flex-col gap-4 w-full max-w-md">
            {/* 제목 */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap text-sm font-medium mr-8">
                계획 제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-2 py-1"
              />
            </div>

            {/* 유저 등록 */}
            <div className="flex items-start gap-2">
              {/* 왼쪽: 고정 폭 라벨 */}
              <label className="whitespace-nowrap text-sm font-medium w-24 pt-2 text-left">
                유저 등록
              </label>

              {/* 오른쪽: input 영역을 w-full로 맞춤 */}
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 text-sm"
                />

                <input
                  type="color"
                  name="color"
                  value={user.color}
                  onChange={handleChange}
                  className="w-10 h-8 p-0 border rounded"
                />

                <div className="relative">
                  <button
                    onClick={() => setShowPicker((prev) => !prev)}
                    className="border rounded px-2 py-1 text-sm h-9 flex items-center"
                  >
                    {user.emoji ? (
                      <span className="text-lg">{user.emoji}</span>
                    ) : (
                      <span className="text-gray-500">💙</span>
                    )}
                  </button>

                  {showPicker && (
                    <div className="absolute right-0 z-10 scale-60">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setUser((prev) => ({
                            ...prev,
                            emoji: emojiData.emoji,
                          }));
                          setShowPicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={addUser}
                  className="bg-silver rounded-full px-2 py-1 text-sm h-9 flex items-center"
                >
                  <span className="text-gray-500">✔</span>
                </button>
              </div>
            </div>

            {/* 유저 목록 */}
            <ul className="space-y-2">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center gap-2 p-2 border rounded"
                >
                  <span className="text-xl">{u.emoji}</span>
                  <span className="text-sm font-medium">{u.name}</span>
                  <span
                    className="w-4 h-4 rounded-full "
                    style={{ backgroundColor: u.color }}
                  />
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="ml-auto text-red-500 text-sm hover:underline"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit}
              className="px-3 py-2 mt-5 bg-metal bg-opacity-50 w-fit text-white rounded cursor-pointer"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSharedPlanModal;

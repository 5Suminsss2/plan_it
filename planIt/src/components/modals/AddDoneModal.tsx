import { useState } from "react";
import ModalHeader from "./ModalHeader";
import Select from "react-select";
import { addDoneModal } from "../../types/calendar";
import { useParams } from "react-router-dom";
import { sharedPlanApi } from "../../api/api";

const AddDoneModal = ({
  isOpen,
  onClose,
  setModalOpen,
  setRefreshTrigger,
  selectedDate,
}: addDoneModal) => {
  const { id } = useParams<{ id: string }>();
  const now = new Date();

  // Todo : user 입력 받아오는 기능 만들기
  const userOptions = [
    { value: "#ff0156", label: "🦄 김수냄" },
    { value: "#ff7171", label: "🐹 김냄수" },
  ];

  const hourOptions = Array.from({ length: 24 }).map((_, i) => {
    const h = i.toString().padStart(2, "0");
    return { value: h, label: `${i}시` };
  });

  const minuteOptions = Array.from({ length: 60 }).map((_, i) => {
    const m = i.toString().padStart(2, "0");
    return { value: m, label: `${i}분` };
  });

  // 현재시간 가져오기
  const hourValue = now.getHours().toString().padStart(2, "0");
  const minuteValue = now.getMinutes().toString().padStart(2, "0");

  const defaultHour =
    hourOptions.find((opt) => opt.value === hourValue) || hourOptions[0];

  const defaultMinute =
    minuteOptions.find((opt) => opt.value === minuteValue) || minuteOptions[0];

  const [user, setUser] = useState(userOptions[0]); // 초기값을 전체 객체로 설정
  const [hour, setHour] = useState(defaultHour);
  const [minute, setMinute] = useState(defaultMinute); // value는 { value: "00", label: "00" }

  const [subject, setSubject] = useState("");
  const [correct, setCorrect] = useState("");
  const [total, setTotal] = useState("");

  if (!isOpen) return null;

  // 할일목록 제출 함수
  const handleSubmit = async () => {
    const data = {
      user: user,
      hour: hour,
      minute: minute,
      subject: subject,
      correct: correct,
      total: total,
      selectedDate: selectedDate,
    };
    setUser(userOptions[0]);
    setHour(defaultHour);
    setMinute(defaultMinute);
    setSubject("");
    setCorrect("");
    setTotal("");

    await sharedPlanApi.addDonePlan(id as string, data);
    setRefreshTrigger((prev) => prev + 1); // 데이터 리프레시
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="modal-box h-[45vh] flex flex-col">
        {/* ModalHeader는 좌측 정렬(기본) */}
        <ModalHeader
          handleShowModal={onClose}
          title="인증하기"
          modalId="modal_topic"
        />

        {/* 중앙 정렬이 필요한 부분만 flex-grow로 감싸기 */}
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="mt-8 mb-2 flex flex-col gap-4 w-full max-w-md">
            {/* 유저 선택 */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap text-sm font-medium">
                유저 선택
              </label>
              <Select
                options={userOptions}
                value={user}
                onChange={(selected) => {
                  if (selected) setUser(selected);
                }}
                className="w-full"
              />
            </div>

            {/* 인증 시간 */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap text-sm font-medium">
                인증 시간
              </label>
              <Select
                options={hourOptions}
                value={hour}
                onChange={(selected) => {
                  if (selected) setHour(selected);
                }}
                className="w-full"
                placeholder="시"
              />
              <Select
                options={minuteOptions}
                value={minute}
                onChange={(selected) => {
                  if (selected) setMinute(selected);
                }}
                className="w-full"
                placeholder="분"
              />
            </div>

            {/* 주제 */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap text-sm font-medium mr-8">
                주제
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border px-2 py-1"
              />
            </div>

            {/* 점수 */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap text-sm font-medium mr-8">
                점수
              </label>
              <input
                type="number"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                className="w-full border px-2 py-1"
              />
              /
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full border px-2 py-1"
              />
            </div>
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

export default AddDoneModal;

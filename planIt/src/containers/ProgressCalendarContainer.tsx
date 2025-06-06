import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import AddDoneModal from "../components/modals/AddDoneModal";
import { EventContentArg, EventInput } from "@fullcalendar/core";
import { sharedPlanApi } from "../api/api";
import { useParams } from "react-router-dom";

const ProgressCalendarContainer = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { id } = useParams<{ id: string }>();

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const lines = eventInfo.event.title.split("\n");
    return (
      <div style={{ padding: "4px 6px" }}>
        {lines.map((line: string, index: number) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    );
  };

  // doneList: 서버에서 가져온 배열
  const convertDoneListToEvents = (doneList: any[]): EventInput[] => {
    return doneList.map((data) => {
      return {
        title: `${data.subject}\n${data.correct}/${data.total}\n${data.user.label}`,
        start: data.selectedDate,
        backgroundColor: data.user.value,
        borderColor: "white",
        textColor: "white",
        // extendedProps: {
        //   location: "회의실",
        //   description: "팀 주간 회의",
        //   category: "단어시험",
        // },
      };
    });
  };

  // 데이터 가져오기
  useEffect(() => {
    const getSharedPlanDetail = async () => {
      try {
        const data = await sharedPlanApi.getSharedPlanDetail(id as string);
        const convertedData = convertDoneListToEvents(data.doneList);
        setEvents(convertedData);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    getSharedPlanDetail();
  }, [refreshTrigger]);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventContent={renderEventContent}
      />

      <AddDoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        setModalOpen={setModalOpen}
        setRefreshTrigger={setRefreshTrigger}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default ProgressCalendarContainer;

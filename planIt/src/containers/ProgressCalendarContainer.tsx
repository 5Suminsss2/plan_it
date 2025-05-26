import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import AddDoneModal from "../components/modals/AddDoneModal";
import { EventContentArg, EventInput } from "@fullcalendar/core";
import { AddEventData } from "../types/calendar";

const ProgressCalendarContainer = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleAddEvent = (data: AddEventData) => {
    if (!selectedDate) return; // null이면 함수 종료

    const newEvent: EventInput = {
      title: `${data.subject}\n${data.correct}/${data.total}\n${data.user.label}`,
      start: selectedDate, // date -> start
      backgroundColor: data.user.value,
      borderColor: "white",
      textColor: "white",
      extendedProps: {
        location: "회의실",
        description: "팀 주간 회의",
        category: "단어시험",
      },
    };

    setEvents([...events, newEvent]);
    setModalOpen(false);
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
        handleAddEvent={handleAddEvent}
      />
    </>
  );
};

export default ProgressCalendarContainer;

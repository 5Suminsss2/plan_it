import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import AddDoneModal from "../components/modals/AddDoneModal";
import { EventContentArg } from "@fullcalendar/core";
export default function ProgressCalendarContainer() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleAddEvent = (data: {
    user: string;
    hour: string;
    minute: string;
    subject: string;
    correct: number;
    total: number;
  }) => {
    const newEvent = {
      title: `${data.subject}\n${data.correct}/${data.total}\n${data.user.label}`,
      date: selectedDate,
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

  // \n -> <div> 태그로 변경
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
}

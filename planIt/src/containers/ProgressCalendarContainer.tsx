import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"; // 먼저 import 필요
import { EventContentArg } from "@fullcalendar/core";
import dayjs from "dayjs";

export default function ProgressCalendarContainer() {
  const [events, setEvents] = useState([
    { title: "처음 일정", date: "2025-05-21" },
  ]);

  const handleDateClick = (arg: DateClickArg) => {
    // 등록한 현재 시각 가져오기
    const now = dayjs();
    const hourStr = now.hour().toString().padStart(2, "0");
    const minuteStr = now.minute().toString().padStart(2, "0");

    const newEvent = {
      title: `${hourStr}:${minuteStr} \n DAY2 18/20 \n 🦄`,
      date: arg.dateStr,
      backgroundColor: "#ff7171",
      borderColor: "white",
      textColor: "white",
      extendedProps: {
        location: "회의실 A",
        description: "팀 주간 회의",
        category: "단어시험",
      },
    };

    setEvents([...events, newEvent]);
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
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      events={events}
      eventContent={renderEventContent}
    />
  );
}

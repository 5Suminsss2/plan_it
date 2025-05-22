import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function ProgressCalendarContainer() {
  const [events, setEvents] = useState([
    { title: "처음 일정", date: "2025-05-21" },
  ]);

  const handleDateClick = (arg: any) => {
    const newEvent = { title: "새 일정", date: arg.dateStr };
    setEvents([...events, newEvent]);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      events={events}
    />
  );
}

import React, { useState } from "react";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarComponent = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    arg.view.calendar.gotoDate(arg.date);
    if (onDateSelect) {
      onDateSelect(arg.dateStr);
    }
  };

  const getDayCellClassNames = (arg) => {
    const cellDate = arg.date;
    const selected = new Date(selectedDate);

    if (
      cellDate.getFullYear() === selected.getFullYear() &&
      cellDate.getMonth() === selected.getMonth() &&
      cellDate.getDate() === selected.getDate()
    ) {
      return ["highlighted"];
    }
    return [];
  };

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="100%"
        dateClick={handleDateClick}
        dayCellClassNames={getDayCellClassNames}
      />
    </div>
  );
};

export default CalendarComponent;

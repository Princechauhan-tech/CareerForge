import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const InterviewCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ padding: "20px" }}>
      <h1>📅 Interview Calendar</h1>

      <Calendar
        onChange={setDate}
        value={date}
      />

      <p>
        Selected Date: {date.toDateString()}
      </p>
    </div>
  );
};

export default InterviewCalendar;
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const InterviewCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem,5vw,3rem)",
          marginBottom: "20px",
        }}
      >
        📅 Interview Calendar
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
        }}
      >
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>

      <p
        style={{
          marginTop: "20px",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        <strong>Selected Date:</strong>{" "}
        {date.toDateString()}
      </p>
    </div>
  );
};

export default InterviewCalendar;
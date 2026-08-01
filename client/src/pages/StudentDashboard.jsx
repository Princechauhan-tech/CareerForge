import { useEffect, useState } from "react";
import socket from "../services/socket";

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.on("interviewScheduled", (data) => {
      console.log("📅 Interview Event:", data);

      setEvents((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("interviewScheduled");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Dashboard</h1>

      <h2>Live Events</h2>

      {events.length === 0 ? (
        <p>No events yet</p>
      ) : (
        events.map((event, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              marginBottom: "10px",
            }}
          >
            📅 {event.message}
          </div>
        ))
      )}
    </div>
  );
};

export default StudentDashboard;
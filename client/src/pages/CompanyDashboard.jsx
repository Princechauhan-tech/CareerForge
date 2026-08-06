import { useEffect, useState } from "react";
import socket from "../services/socket";

const CompanyDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("newApplication", (data) => {
      console.log("🔔 Notification:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("newApplication");
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
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
        🏢 Company Dashboard
      </h1>

      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map((notification, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              marginBottom: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              wordBreak: "break-word",
            }}
          >
            🔔 {notification.message}
          </div>
        ))
      )}
    </div>
  );
};

export default CompanyDashboard;
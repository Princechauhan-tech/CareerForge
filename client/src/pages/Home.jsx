import { useEffect } from "react";
import socket from "../services/socket";

const Home = () => {
  useEffect(() => {
    console.log("Home Mounted");

    socket.on("connect", () => {
      console.log("🟢 Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket Error:", err.message);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      <h1>🏠 CareerForge Home Page</h1>
    </div>
  );
};

export default Home;
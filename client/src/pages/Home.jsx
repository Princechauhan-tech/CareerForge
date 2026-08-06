import { useEffect } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>🏠 CareerForge Home Page</h1>

      <p>Welcome to CareerForge Job Portal.</p>
    </motion.div>
  );
};

export default Home;
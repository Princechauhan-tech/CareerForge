import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "80vh",
          padding: "20px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
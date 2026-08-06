import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    navigate("/login");
  };

  return (
    <nav
  style={{
    backgroundColor: "#0f172a",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
  }}
>
      <h2 style={{ color: "white", margin: 0 }}>
        CareerForge
      </h2>

      <div
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
        <motion.div whileHover={{ scale: 1.1 }}>
  <Link
    to="/"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    Home
  </Link>
</motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
  <Link
    to="/calendar"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    Calendar
  </Link>
</motion.div>

        {!isAuthenticated ? (
          <>
            <motion.div whileHover={{ scale: 1.1 }}>
  <Link
    to="/login"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    Login
  </Link>
</motion.div>

            <motion.div whileHover={{ scale: 1.1 }}>
  <Link
    to="/register"
    style={{
      color: "white",
      textDecoration: "none",
    }}
  >
    Register
  </Link>
</motion.div>
          </>
        ) : (
          <motion.button
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleLogout}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Logout
</motion.button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
        <Link
  to="/calendar"
  style={{
    color: "white",
    textDecoration: "none",
  }}
>
  Calendar
</Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <button
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
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
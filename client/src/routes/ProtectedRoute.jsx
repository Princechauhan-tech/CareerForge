import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector(
    (state) => state.auth
  );

  const localToken = localStorage.getItem("token");

  if (isAuthenticated || token || localToken) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
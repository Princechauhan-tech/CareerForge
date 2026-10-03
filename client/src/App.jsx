import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { setCredentials } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (token && user) {
    dispatch(setCredentials({ token, user }));
  }
}, [dispatch]);

  return <AppRoutes />;
}

export default App;
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import StudentDashboard from "../pages/StudentDashboard";
import CompanyDashboard from "../pages/CompanyDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";
import Calendar from "../pages/Calendar";
const AppRoutes = () => {
  return (
    <Routes>

      {/* Website Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company-dashboard"
        element={
          <ProtectedRoute>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <Calendar />
    </ProtectedRoute>
  }
/>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;
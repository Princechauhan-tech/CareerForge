import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "../components/layout/Layout";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// Dashboards
import StudentDashboard from "../pages/StudentDashboard";
import CompanyDashboard from "../pages/CompanyDashboard";
import AdminDashboard from "../pages/AdminDashboard";

// Main Pages
import Jobs from "../pages/Jobs";
import Companies from "../pages/Companies";
import Profile from "../pages/Profile";

// Student Features
import Calendar from "../pages/Calendar";
import JobDetails from "../pages/JobDetails";
import MyApplications from "../pages/MyApplications";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import AISuggestions from "../pages/AISuggestions";
import AIInterviewQuestions from "../pages/AIInterviewQuestions";

// Protection
import ProtectedRoute from "./ProtectedRoute";

import CompanyProfile from "../pages/CompanyProfile";
import CompanyJobs from "../pages/CompanyJobs";
import CreateJob from "../pages/CreateJob";
import EditJob from "../pages/EditJob";

import CompanyApplicants from "../pages/CompanyApplicants";
import CandidateProfile from "../pages/CandidateProfile";
import InterviewManagement from "../pages/InterviewManagement";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >

        {/* =====================================================
            PUBLIC WEBSITE LAYOUT
        ===================================================== */}

        <Route path="/" element={<Layout />}>

          {/* Home */}
          <Route
            index
            element={<Home />}
          />

          {/* Jobs */}
          <Route
            path="jobs"
            element={<Jobs />}
          />

          {/* Companies */}
          <Route
            path="companies"
            element={<Companies />}
          />

          {/* Job Details */}
          <Route
            path="jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />

        </Route>


        {/* =====================================================
            AUTH
        ===================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================================
            PROTECTED ROUTES
        ===================================================== */}

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            DASHBOARDS
        ===================================================== */}

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Company Dashboard */}
        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/company/profile"
  element={
    <ProtectedRoute>
      <CompanyProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/company/jobs"
  element={
    <ProtectedRoute>
      <CompanyJobs />
    </ProtectedRoute>
  }
/>

<Route
  path="/company/jobs/create"
  element={
    <ProtectedRoute>
      <CreateJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/company/jobs/edit/:id"
  element={
    <ProtectedRoute>
      <EditJob />
    </ProtectedRoute>
  }
/>

<Route
  path="/company/applicants"
  element={
    <ProtectedRoute>
      <CompanyApplicants />
    </ProtectedRoute>
  }
/>

<Route
  path="/company/candidate/:id"
  element={
    <ProtectedRoute>
      <CandidateProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/company/interviews"
  element={
    <ProtectedRoute>
      <InterviewManagement />
    </ProtectedRoute>
  }
/>

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            JOBS
        ===================================================== */}

        {/* Old Job Details Route */}
        <Route
          path="/job-details/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            STUDENT FEATURES
        ===================================================== */}

        {/* Calendar */}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />


        {/* My Applications */}
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            AI FEATURES
        ===================================================== */}

        {/* Resume Analyzer */}
        <Route
          path="/resume-analyzer"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          }
        />


        {/* AI Suggestions */}
        <Route
          path="/ai-suggestions"
          element={
            <ProtectedRoute>
              <AISuggestions />
            </ProtectedRoute>
          }
        />


        {/* AI Interview Questions */}
        <Route
          path="/ai-interview-questions"
          element={
            <ProtectedRoute>
              <AIInterviewQuestions />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            404 - ALWAYS KEEP THIS AT THE VERY END
        ===================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import JobPosting from "./pages/JobPosting";
import JobDetails from "./pages/JobDetails";
import Interview from "./pages/Interview";
import InterviewStart from "./pages/InterviewStart";
import Feedback from "./pages/Feedback";
import Auth from "./pages/Auth";
import InterviewFeedback from "./pages/InterviewFeedback";
import Jobs from "./pages/Jobs";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyJobDashboard from "./pages/CompanyJobDashboard";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return <SignedIn>{children}</SignedIn> || <Navigate to="/auth" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/feedback">
          <Route
            index
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <InterviewFeedback />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/jobs">
          <Route index element={<Jobs />} />
          <Route
            path=":jobId"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/company">
          <Route
            path="postJob"
            element={
              <ProtectedRoute>
                <JobPosting />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashBoard"
            element={
              <ProtectedRoute>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashBoard/:JobId"
            element={
              <ProtectedRoute>
                <CompanyJobDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/interview">
          <Route
            index
            element={
              <ProtectedRoute>
                <Interview />
              </ProtectedRoute>
            }
          />
          <Route
            path=":interviewId"
            element={
              <ProtectedRoute>
                <InterviewStart />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

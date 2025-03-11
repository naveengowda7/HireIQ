import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/feedback">
          <Route index element={<Feedback />} />
          <Route path=":id" element={<InterviewFeedback />} />
        </Route>

        <Route path="/jobs">
          <Route index element={<Jobs />} />
          <Route path=":jobId" element={<JobDetails />} />
        </Route>

        <Route path="/company">
          <Route path="postJob" index element={<JobPosting />} />
          <Route path="dashBoard" element={<CompanyDashboard />} />
          <Route path="dashBoard/:JobId" element={<CompanyJobDashboard />} />
        </Route>

        <Route path="/interview">
          <Route index element={<Interview />} />
          <Route path=":interviewId" element={<InterviewStart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

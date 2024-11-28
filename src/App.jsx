import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Welcome from "./Pages/Welcome/Welcome";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import RequestForm from "./Pages/RequestForm/RequestForm";
import Preview from "./Pages/Preview/Preview";
import RequestFormSection from "./Pages/RequestFormSection/RequestFormSection";
import TemplateCration from "./Pages/TemplateCration";
import PendingReq from "./Pages/PendingReq/PendingReq";
import MeetingOption from "./BookMeetingPages/MeetingOption/MeetingOption";
import CreateMeeting from "./BookMeetingPages/CreateMeeting/CreateMeeting";
import MeetingStatus from "./BookMeetingPages/MeetingStatus/MeetingStatus";
import VisitorOptions from "./VisitorTrackingPages/VisitorOptions/VisitorOptions";
import VisitorCreate from "./VisitorTrackingPages/VisitorCreate/VisitorCreate";
import VisitorManager from "./VisitorTrackingPages/VisitorManager";
import VisitorRecords from "./VisitorTrackingPages/VisitorRecords/VisitorRecords";
import CompletedReq from "./Pages/CompletedReq/CompletedReq";
;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/temp" element={<TemplateCration />} />
        <Route path="/v" element={<VisitorManager />} />
     
      
        <Route
          path="/home"
          element={
            // <ProtectedRoute>
              <Home />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-form/options/create"
          element={
            <ProtectedRoute>
              <RequestForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-form/options"
          element={
            <ProtectedRoute>
              <RequestFormSection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview"
          element={
            <ProtectedRoute>
              <Preview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request-form/option/pending"
          element={
            <ProtectedRoute>
              <PendingReq />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-form/option/complete"
          element={
            <ProtectedRoute>
              <CompletedReq />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meeting/options"
          element={
            // <ProtectedRoute>
              <MeetingOption />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/meeting/create"
          element={
            // <ProtectedRoute>
              <CreateMeeting />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/meeting/status"
          element={
            // <ProtectedRoute>
              <MeetingStatus />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/visit/options"
          element={
            // <ProtectedRoute>
              <VisitorOptions/>
            // </ProtectedRoute>
          }
        />
          <Route
          path="/visit/create"
          element={
            // <ProtectedRoute>
              <VisitorCreate/>
            // </ProtectedRoute>
          }
        />
          <Route
          path="/visit/record"
          element={
            // <ProtectedRoute>
              <VisitorRecords/>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

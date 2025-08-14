// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import Calendars from "./components/pages/calendars/calendars.jsx";
import CheckReport from "./components/pages/reportform/CheckReport.jsx";
import SubmitReport from "./components/pages/reportform/SubmitReport.jsx";
import Login from "./components/pages/reportform/Login.jsx";
import ApprovalReport from "./components/pages/reportform/ApprovalReport.jsx";

import "./App.css";
import BoardPage from "./components/pages/boardForm/BoardPage.jsx";
import ViewPage from "./components/pages/boardForm/ViewPage.jsx";
import WritePage from "./components/pages/boardForm/WritePage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage imageUrl="/Generated.png" />} />
        <Route path="/calendars" element={<Calendars />} />

        <Route path="/reports" element={<CheckReport />} />
        <Route path="/check-report" element={<CheckReport />} />

        <Route path="/submit-report" element={<SubmitReport />} />
        <Route path="/login" element={<Login />} />

        <Route path="/approval-report" element={<ApprovalReport />} />
        <Route path="/approval-report/:no" element={<ApprovalReport />} />

        <Route path="/archive" element={<BoardPage />} />
        <Route path="/archive/write" element={<WritePage />} />
        <Route path="/archive/:no" element={<ViewPage />} />

        <Route path="/BoardPage" element={<BoardPage />} />
        <Route path="/WritePage" element={<WritePage />} />
        <Route path="/ViewPage" element={<ViewPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

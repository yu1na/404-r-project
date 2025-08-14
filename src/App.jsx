// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import Calendars from "./components/pages/calendars/calendars.jsx";
import CheckReport from "./components/pages/approvalform/CheckReport.jsx";
import SubmitReport from "./components/pages/approvalform/SubmitReport.jsx";
import Login from "./components/pages/approvalform/Login.jsx";
import ApprovalReport from "./components/pages/approvalform/ApprovalReport.jsx";

import "./App.css";

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

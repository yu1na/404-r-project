import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import HomePage from './components/pages/HomePage.jsx';
import Calendars from './components/pages/calendars.jsx';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage imageUrl="/Generated.png" />}
        />
        <Route path="/calendars" element={<Calendars />}/>
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './components/HomePage'; // Adjust this path as necessary
import Auth from "./components/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/components/auth" />} />
        <Route path="/components/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './components/HomePage'; // Make sure this path is correct
import Auth from "./components/Auth"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/components/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

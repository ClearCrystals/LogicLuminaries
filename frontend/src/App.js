import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Auth from "./components/Auth";
import Games from "./components/Games";
import SudokuGame from './components/SudokuGame';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components/auth" element={<Auth />} />
        <Route path="/components/games" element={<Games />} />
        <Route path="/components/sudokugame" element={<SudokuGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

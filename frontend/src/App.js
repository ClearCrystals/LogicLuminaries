import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './components/HomePage'; // Make sure this path is correct

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;

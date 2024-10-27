// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import LeaderboardPage from "./pages/Leaderboardpage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
        <Route path="/" exact component={HomePage} />
          <Route path="/home" element={<Home />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} /> 
          <Route path="/leaderboard" component={<LeaderboardPage/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthorityDashboard from './pages/AuthorityDashboard';
import './App.css'
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReportIssue from './pages/ReportIssue';
import PublicDashboard from './pages/PublicDashboard';
import Navbar from './components/Navbar';
import './components/Navbar.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/dashboard" element={<PublicDashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

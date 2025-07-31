import './App.css'
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReportIssue from './pages/ReportIssue';
import PublicDashboard from './pages/PublicDashboard';
import Navbar from './components/Navbar';
import './components/Navbar.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthorityDashboard from '../src/pages/AuthorityDashboard';
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<ReportIssue />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/report" element={<ReportIssue />} />
              <Route path="/dashboard/public" element={<PublicDashboard />} />
              
              <Route path="/authority" element={<AuthorityDashboard/>} />
          </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AuthorityDashboard from './pages/AuthorityDashboard';
import PublicDashboard from './pages/PublicDashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/dashboard" element={<PublicDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

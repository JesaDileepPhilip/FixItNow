import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthorityDashboard from '../src/pages/AuthorityDashboard';
import PublicDashboard from '../src/pages/PublicDashboard';
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/authority" element={<AuthorityDashboard/>} />
            <Route path="/dashboard" element={<PublicDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App;
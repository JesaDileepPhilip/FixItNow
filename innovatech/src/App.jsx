import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthorityDashboard from '../src/pages/AuthorityDashboard';
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/authority" element={<AuthorityDashboard/>} />
          </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
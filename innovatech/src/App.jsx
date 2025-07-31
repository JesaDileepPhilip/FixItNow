import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/dashboard" element={<PublicDashboard />} />
      </Routes>
    </div>
  )
}

export default App

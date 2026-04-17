/**
 * Entrypoint and routes for the application.
 */

import { BrowserRouter, Routes, Route } from 'react-router'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Neos from './pages/Neos.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/neos' element={<Neos />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)

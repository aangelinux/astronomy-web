/**
 * Entrypoint and routes for the React application.
 */

import ReactDOM from 'react-dom/client'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Neos from './pages/Neos.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/neos" element={<Neos />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)

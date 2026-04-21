/**
 * Entrypoint and routes for the application.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context.jsx'
import { ErrorBoundary } from './errorBoundary.jsx'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Neos from './pages/Neos.jsx'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route index element={<Dashboard />} />
            <Route path='neos' element={<Neos />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)

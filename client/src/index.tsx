/**
 * Entrypoint and routes for the application.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context'
import ErrorBoundary from './errorBoundary'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Neos from './pages/Neos'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route index element={<Dashboard />} />
            <Route path='/neos' element={<Neos />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  )
}

ReactDOM.createRoot(document.getElementById('app')!).render(<App />)

/**
 * Entrypoint and routes for the application.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './hooks/context'
import ErrorBoundary from './errorBoundary'
import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import NeosPage from './pages/Neos'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route index element={<DashboardPage />} />
            <Route path='/neos' element={<NeosPage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  )
}

ReactDOM.createRoot(document.getElementById('app')!).render(<App />)

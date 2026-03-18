/**
 * Entrypoint and routes for the React application.
 */

import ReactDOM from 'react-dom/client'
import SignIn from './pages/OAuth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Neos from './pages/Neos.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router'

function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to='/'>Auth</Link> | {' '}
				<Link to='/dashboard'>Dashboard</Link> | {' '}
				<Link to='/neos'>Neos</Link> | {' '}
			</nav>

			<Routes>
				<Route path='/' element={ <SignIn /> } />
				<Route path='/dashboard' element={ <Dashboard /> } />
				<Route path='/neos' element={ <Neos /> } />
			</Routes>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)
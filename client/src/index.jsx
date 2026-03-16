/**
 * Entrypoint for React application.
 */

import ReactDOM from 'react-dom/client'
import SignInGithub from './pages/OAuth.jsx'

ReactDOM.createRoot(document.getElementById('app')).render(<SignInGithub />)
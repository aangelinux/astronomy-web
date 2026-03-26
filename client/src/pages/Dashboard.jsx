/**
 * Dashboard page.
 */

import NavBar from '../components/NavBar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import InfoPanel from '../components/InfoPanel.jsx'
import { AppProvider } from '../hooks/context.jsx'

function Dashboard() {
  return (
    <AppProvider>
			<NavBar />
      <h1>Astronomy Dashboard</h1>
			<SearchBar />
			<InfoPanel />
    </AppProvider>
  )
}

export default Dashboard

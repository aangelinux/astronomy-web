/**
 * Dashboard page.
 */

import NavBar from '../components/NavBar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import InfoPanel from '../components/InfoPanel.jsx'

function Dashboard() {
  return (
    <div>
			<NavBar />
      <h1>Astronomy Dashboard</h1>
			<SearchBar />
			<InfoPanel />
    </div>
  )
}

export default Dashboard

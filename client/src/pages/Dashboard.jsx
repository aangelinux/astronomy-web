/**
 * Dashboard page.
 */

import NavBar from '../components/NavBar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { AppProvider } from '../hooks/context.jsx'
import styles from './styles/Dashboard.module.css'

function Dashboard() {
  return (
		<div className={styles.page}>
			<AppProvider>
				<NavBar />
				<h1 className={styles.header}>Astronomy Dashboard</h1>
				<SearchBar />
			</AppProvider>
		</div>
  )
}

export default Dashboard

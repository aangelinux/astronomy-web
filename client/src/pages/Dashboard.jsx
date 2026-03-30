/**
 * Dashboard page.
 */

import styles from './styles/Dashboard.module.css'
import AIPanel from '../components/AIPanel.jsx'
import AttributePanel from '../components/AttributePanel.jsx'
import NavBar from '../components/NavBar.jsx'
import OrbitView from '../components/OrbitView.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { AppProvider } from '../hooks/context.jsx'

function Dashboard() {
  return (
		<div className={styles.page}>
			<AppProvider>
				<div className={styles.nav}><NavBar /></div>
				<div className={styles.header}><h1>Astronomy Dashboard</h1></div>
				<div className={styles.search}><SearchBar /></div>
				<div className={styles.attributes}><AttributePanel /></div>
				<div className={styles.ai}><AIPanel /></div>
				<div className={styles.orbit}><OrbitView /></div>
			</AppProvider>
		</div>
  )
}

export default Dashboard

/**
 * Dashboard page.
 */

import styles from './styles/Dashboard.module.css'
import AIPanel from '../components/AIPanel.jsx'
import ApproachTimeline from '../components/ApproachTimeline.jsx'
import AttributePanel from '../components/AttributePanel.jsx'
import NavBar from '../components/NavBar.jsx'
import OrbitView from '../components/OrbitView.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { AppProvider } from '../context.jsx'
import { authenticate } from '../api/auth.js'
import { useEffect } from 'react'

function Dashboard() {
  useEffect(() => {
    async function auth() {
      try {
        await authenticate()
      } catch (error) {
        console.log(error)
        window.location.href = 'http://localhost:3002/'
      }
    }
    auth()
  }, [])

  return (
    <div className={styles.page}>
      <AppProvider>
        <div className={styles.nav}><NavBar /></div>
        <div className={styles.header}><h1>Astronomy Dashboard</h1></div>
        <div className={styles.search}><SearchBar /></div>
        <div className={styles.attributes}><AttributePanel /></div>
        <div className={styles.ai}><AIPanel /></div>
        <div className={styles.orbit}><OrbitView /></div>
        <div className={styles.timeline}><ApproachTimeline /></div>
      </AppProvider>
    </div>
  )
}

export default Dashboard

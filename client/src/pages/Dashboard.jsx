/**
 * Main dashboard page.
 */

import styles from './styles/Dashboard.module.css'
import ApproachTimeline from '../features/approachTimeline/ApproachTimeline.jsx'
import AttributePanel from '../features/attributePanel/AttributePanel.jsx'
import DescriptionPanel from '../features/descriptionPanel/DescriptionPanel.jsx'
import NavBar from '../features/navBar/NavBar.jsx'
import NeoSelection from '../features/neoSelection/NeoSelection.jsx'
import OrbitView from '../features/orbitView/OrbitView.jsx'
import { authenticate } from '../features/authentication/api.js'
import { AppProvider } from '../context.jsx'
import { useEffect } from 'react'

function Dashboard() {
  useEffect(() => {
    async function checkAuth() {
      try {
        await authenticate()
      } catch (error) {
        console.log(error)
        window.location.href = '/auth'
      }
    }
    checkAuth()
  }, [])

  return (
    <div className={styles.page}>
      <AppProvider>
        <div className={styles.nav}><NavBar /></div>
        <div className={styles.header}><h1>Astronomy Dashboard</h1></div>
        <div className={styles.select}><NeoSelection /></div>
        <div className={styles.attributes}><AttributePanel /></div>
        <div className={styles.description}><DescriptionPanel /></div>
        <div className={styles.orbit}><OrbitView /></div>
        <div className={styles.timeline}><ApproachTimeline /></div>
      </AppProvider>
    </div>
  )
}

export default Dashboard

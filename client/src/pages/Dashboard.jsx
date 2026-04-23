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
import ErrorAlert from '../features/alerts/ErrorAlert.jsx'
import { authenticate } from '../features/authentication/api.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      try {
        await authenticate()
      } catch (error) {
        console.log(error)
        navigate('/login')
      }
    }
    checkAuth()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.nav}><NavBar /></div>
      <div className={styles.header}><h1>Astronomy Dashboard</h1></div>
      <div className={styles.select}><NeoSelection /></div>
      <div className={styles.attributes}><AttributePanel /></div>
      <div className={styles.description}><DescriptionPanel /></div>
      <div className={styles.orbit}><OrbitView /></div>
      <div className={styles.timeline}><ApproachTimeline /></div>
      <div className={styles.error}><ErrorAlert /></div>
    </div>
  )
}

export default Dashboard

/**
 * Page displaying all NEOs in the database.
 */

import styles from './styles/Neos.module.css'
import NavBar from '../features/navBar/NavBar.jsx'
import NeoTable from '../features/neoTable/NeoTable.jsx'
import { authenticate } from '../features/authentication/api.js'
import { useEffect } from 'react'

function Neos() {
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
      <div className={styles.nav}><NavBar /></div>
      <div className={styles.header}><h1>Near-Earth Objects</h1></div>
      <div className={styles.table}><NeoTable /></div>
    </div>
  )
}

export default Neos

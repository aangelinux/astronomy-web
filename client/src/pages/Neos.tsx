/**
 * Page displaying a table of all NEOs in the database.
 */

import styles from './styles/Neos.module.css'
import NavBar from '../features/navBar/NavBar'
import NeoTable from '../features/neoTable/NeoTable'
import { authenticate } from '../features/authentication/api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Neos() {
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth(): Promise<void> {
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
      <div className={styles.header}><h1>Near-Earth Objects</h1></div>
      <div className={styles.table}><NeoTable /></div>
    </div>
  )
}

export default Neos

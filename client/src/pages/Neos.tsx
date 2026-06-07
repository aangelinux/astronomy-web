/**
 * Page displaying a table of all NEOs in the database.
 */

import styles from './styles/Neos.module.css'
import NavBar from '../features/navBar/NavBar'
import NeoTable from '../features/neoTable/NeoTable'

function NeosPage() {
  return (
    <div className={styles.page}>
      <div className={styles.nav}><NavBar /></div>
      <div className={styles.header}><h1>Near-Earth Objects</h1></div>
      <div className={styles.table}><NeoTable /></div>
    </div>
  )
}

export default NeosPage

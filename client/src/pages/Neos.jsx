/**
 * Page displaying a table containing all NEOs.
 */

import styles from './styles/Neos.module.css'
import NavBar from '../components/NavBar.jsx'
import NeoTable from '../components/NeoTable.jsx'

function Neos() {
  return (
    <div className={styles.page}>
      <div className={styles.nav}><NavBar /></div>
      <div className={styles.header}><h1>Near-Earth Objects</h1></div>
      <div className={styles.table}><NeoTable /></div>
    </div>
  )
}

export default Neos

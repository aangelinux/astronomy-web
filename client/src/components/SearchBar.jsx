/**
 * Search bar component.
 */

import { useState } from 'react'
import styles from '../styles/SearchBar.module.css'

function SearchBar() {
	const [input, suggestions] = useState()
	
	return (
		<input type="text" placeholder="NEO name ..." className={styles.searchBar}>
		</input>
	)
}

export default SearchBar
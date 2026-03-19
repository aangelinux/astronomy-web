/**
 * Search bar component.
 */

import { useState } from 'react'
import { filterNeosBy } from '../api/NEOs.js'
import styles from '../styles/SearchBar.module.css'

function SearchBar() {
	const [input, suggestions] = useState()
	
	return (
		<div>
			<input type="text" placeholder="NEO name ..." className={styles.searchBar}
				onChange={() => filterNeosBy(input)}>
			</input>
			<li>
				<ul>{console.log(suggestions)}</ul>
			</li>
		</div>
	)
}

export default SearchBar
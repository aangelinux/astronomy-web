/**
 * Search bar component.
 */

import { useState } from 'react'
import { filterNeosBy } from '../api/NEOs.js'
import styles from '../styles/SearchBar.module.css'

function SearchBar() {
	const [input, setInput] = useState("")
	const [suggestions, setSuggestions] = useState([])

	function handleChange(value) {
		setInput(value)

		// Delay query to DB for better performance
		setTimeout(async () => { 
			const results = await filterNeosBy(value)
			setSuggestions(results.neos)
		}, 500)
	}
	
	return (
		<div>
			<input type="text" 
				placeholder="NEO name ..." 
				value={input}
				className={styles.searchBar}
				onChange={e => handleChange(e.target.value)}>
			</input>

			<div className={styles.suggestionList}>
				{suggestions.map((suggestion, index) => (
					<li key={index}>{suggestion.name}</li>
				))}
			</div>
		</div>
	)
}

export default SearchBar
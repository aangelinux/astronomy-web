/**
 * Search bar component.
 */

import { useEffect, useState } from 'react'
import { filterNeosBy } from '../api/neos.js'
import { useAppContext } from '../hooks/context.jsx'
import styles from '../styles/SearchBar.module.css'

function SearchBar() {
	const { neo, setNeo } = useAppContext()
	const [suggestions, setSuggestions] = useState([])
	const [isFocused, setIsFocused] = useState(false)

	useEffect(() => {
		if (!neo) {
			setSuggestions([])
			return
		}

		// Delay query to DB for better performance
		const timeOut = setTimeout(async () => { 
			const results = await filterNeosBy(neo)
			setSuggestions(results.neos)
		}, 500)

		return () => clearTimeout(timeOut) // Clean up
	}, [neo])
	
	return (
		<div>
			<input type="text" 
				placeholder="NEO name ..." 
				value={neo}
				className={styles.searchBar}
				onChange={(e) => setNeo(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}>
			</input>

			{isFocused && suggestions.length > 0 && (
				<div className={styles.suggestionList}>
					{suggestions.map((suggestion, index) => (
						<li key={index}>{suggestion.name}</li>
					))}
				</div>
			)}
		</div>
	)
}

export default SearchBar
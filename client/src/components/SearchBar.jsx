/**
 * Search bar component.
 */

import { useEffect, useState } from 'react'
import { filterNeosBy } from '../api/neos.js'
import { useAppContext } from '../hooks/context.jsx'
import styles from '../styles/SearchBar.module.css'

function SearchBar() {
	const { setNeo } = useAppContext()
	const [input, setInput] = useState("")
	const [suggestions, setSuggestions] = useState([])
	const [isFocused, setIsFocused] = useState(false)

	useEffect(() => {
		if (!input) {
			setSuggestions([])
			return
		}
		// Delay query to DB for better performance
		const timeOut = setTimeout(async () => { 
			const results = await filterNeosBy(input)
			setSuggestions(results.neos)
		}, 500)

		return () => clearTimeout(timeOut) // Clean up
	}, [input])

	const handleSubmit = (e) => {
		e.preventDefault()
		setNeo(input)
	}
	
	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="text" 
					placeholder="NEO name ..." 
					value={input}
					className={styles.searchBar}
					onChange={(e) => setInput(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}>
				</input>
				</form>

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
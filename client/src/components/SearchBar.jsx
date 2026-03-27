/**
 * Search bar component with autocomplete.
 */

import { useAppContext } from '../hooks/context.jsx'
import { filterNeosBy } from '../api/neos.js'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

function SearchBar() {
	const { setNeo } = useAppContext()
	const [options, setOptions] = useState([])

	const fetchOptions = (query) => {
		if (!query) return
		const timer = setTimeout(async () => {
			const data = await filterNeosBy(query)
			const neos = data.neos.map((neo) => neo.name)
			setOptions(neos)
		}, 500)

		return () => { clearTimeout(timer) }
	}

	return (
		<Autocomplete
			disablePortal
			onSelect={(e) => { setNeo(e.target.value) }}
			onInputChange={(e) => fetchOptions(e.target.value)}
			filterOptions={(x) => x}
			options={options}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Search NEOs ..." />}
		/>
	)
}

export default SearchBar
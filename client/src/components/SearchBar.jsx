/**
 * Search bar component with autocomplete.
 */

import { useAppContext } from '../hooks/context.jsx'
import { filterNeosBy, getNeoData, getNeoSpkid } from '../api/neos.js'
import { Autocomplete, Button, TextField } from '@mui/material'
import { useState } from 'react'

function SearchBar() {
	const { setNeoData } = useAppContext()
	const [neo, setNeo] = useState("")
	const [options, setOptions] = useState([])

	const fetchOptions = (query) => {
		if (!query) return
		const timer = setTimeout(async () => {
			const data = await filterNeosBy(query)
			const neos = data.map((neo) => neo.name)
			setOptions(neos)
		}, 500)

		return () => clearTimeout(timer)
	}

	const handleClick = async () => {
		const spkid = await getNeoSpkid(neo)
		const data = await getNeoData(spkid)
		
		setNeoData(data)
	}

	const textFieldStyle = {
		input: { color: 'white' },
		label: { color: 'white'},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'whitesmoke',
			},
			'&:hover fieldset': {
				borderColor: 'white',
			},
		},
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
			<Autocomplete
				disablePortal
				onChange={(event, value) => setNeo(value)} 
				onInputChange={(e) => fetchOptions(e.target.value)}
				filterOptions={(x) => x}
				options={options}
				sx={{ width: 300 }}
				renderInput={(params) => 
					<TextField {...params} 
						color="secondary" sx={textFieldStyle} label="Search NEOs ..." 
					/>
				}
			/>
			<Button variant="outlined" onClick={handleClick} sx={{ 
				maxHeight: 40, 
				alignSelf: 'center' 
			}}>
				Select NEO
			</Button>
		</div>
	)
}

export default SearchBar
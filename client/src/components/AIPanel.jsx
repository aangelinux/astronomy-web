/**
 * Panel displaying an AI-generated description.
 */

import { Box, Card, CardContent } from '@mui/material'
import { useAppContext } from '../hooks/context.jsx'
import { useState, useEffect } from 'react'
import { fetchGenAI } from '../api/genai.js'

function AIPanel() {
	const { neoData } = useAppContext()
	const [description, setDescription] = useState("")

	useEffect(() => {
		// const fetchDescription = async () => {
		// 	const text = await fetchGenAI(neoData)
		// 	setDescription(text)
		// }
		// fetchDescription()
	}, [neoData])

	const card = (
		<CardContent>
			AI generated description here ...
		</CardContent>
	)

	return (
		<Box sx={{ 
			minWidth: 275,
			boxShadow: 1,
			borderRadius: 2,
			fontFamily: 'GoogleSans',
			fontWeight: 'bold',
			textAlign: 'center'
		}}>
			<Card variant="outlined">{card}</Card>
		</Box>
	)
}

export default AIPanel
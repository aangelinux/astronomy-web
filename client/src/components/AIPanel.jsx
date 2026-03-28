/**
 * Panel displaying an AI-generated description.
 */

import { Box, Card, CardContent } from '@mui/material'
import { useAppContext } from '../hooks/context.jsx'
import { useState, useEffect } from 'react'
import { getNeo } from '../api/neos.js'
import { fetchGenAI } from '../api/genai.js'

function AIPanel() {
	const { neo } = useAppContext()
	const [description, setDescription] = useState("")

	useEffect(() => {
		const fetchDescription = async () => {
			const input = await getNeo(neo)
			const text = await fetchGenAI(input)
			setDescription(text)
		}
		fetchDescription()
	}, [neo])

	const card = (
		<CardContent>
			{description}
		</CardContent>
	)

	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant="outlined">{card}</Card>
		</Box>
	)
}

export default AIPanel
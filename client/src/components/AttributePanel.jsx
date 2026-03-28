/**
 * Panel displaying NEO attributes.
 */

import { Box, Card, CardContent } from '@mui/material'
import { useAppContext } from '../hooks/context.jsx'
import { useState, useEffect } from 'react'
import { getNeo } from '../api/neos.js'

function AttributePanel() {
	const { neo } = useAppContext()
	const [attributes, setAttributes] = useState([])

	useEffect(() => {
		const fetchNeo = async () => {
			const data = await getNeo(neo)
			const vales = Object.values(data)
			setAttributes(vales)
		}
		fetchNeo()
	}, [neo])

	const card = (
		<CardContent>
			<ul>
				{attributes.map((attribute, index) => (
					<li key={index}>{attribute}</li>
				))}
			</ul>
		</CardContent>
	)

	return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
	)
}

export default AttributePanel
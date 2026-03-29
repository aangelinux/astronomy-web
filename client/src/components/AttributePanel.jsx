/**
 * Panel displaying NEO attributes.
 */

import { Box, Card, CardContent, List, ListItem, Typography } from '@mui/material'
import { useAppContext } from '../hooks/context.jsx'
import { useState, useEffect } from 'react'
import { getNeo } from '../api/neos.js'

function AttributePanel() {
	const { neo } = useAppContext()
	const [attributes, setAttributes] = useState([])

	useEffect(() => {
		async function fetchNeo() {
			const data = await getNeo(neo)
			setAttributes(data)
		}
		fetchNeo()
	}, [neo])

	const mapAttributes = () => {
		const map = [
			{ 'SPKID': attributes['spkid'] },
			{ 'Name': attributes['name'] },
			{ 'Earth MOID': attributes['earth_moid_ld'] },
			{ 'Magnitude': attributes['magnitude'] },
			{ 'Rotation (hours)': attributes['rotation_hours'] },
			{ 'PHA': attributes['pot_hazardous_asteroid'] }
		]
		const filteredMap = map.filter((entry) => 
			(Object.values(entry)[0] !== null || undefined))

		return filteredMap
	}

	const card = (
		<CardContent>
			<Typography variant='h6' sx={{
				fontFamily: 'GoogleSans',
				fontWeight: 'bold',
				paddingTop: 1,
				border: 'none'
			}}>
				Attributes
			</Typography>
			<List>
				{mapAttributes().map((attribute, index) => (
					<ListItem key={index}>
						{`${Object.keys(attribute)}: ${Object.values(attribute)}`}
					</ListItem>
				))}
			</List>
		</CardContent>
	)

	return (
		<Box sx={{ 
			minWidth: 225,
			boxShadow: 1,
			fontFamily: 'GoogleSans',
			fontSize: '.95rem',
			textAlign: 'center',
			letterSpacing: 1,
			lineHeight: .8,
			listStyleType: 'none',
		}}>      
		<Card variant="outlined">{card}</Card>
    </Box>
	)
}

export default AttributePanel
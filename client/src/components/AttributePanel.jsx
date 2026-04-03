/**
 * Panel displaying NEO attributes.
 */

import { Box, Card, CardContent, List, ListItem, Typography } from '@mui/material'
import { useAppContext } from '../context.jsx'
import { useState, useEffect } from 'react'

function AttributePanel() {
	const { neoData } = useAppContext()
	const [attributes, setAttributes] = useState([])

	useEffect(() => {
		setAttributes(neoData)
	}, [neoData])

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
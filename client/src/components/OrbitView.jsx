/**
 * Renders a view of a NEO's orbit.
 */

import { useEffect, useRef } from 'react'
import { useAppContext } from '../hooks/context.jsx'
import { Box } from '@mui/material'
import { orbit } from '../js/orbit.js'

function OrbitView() {
	const { neoData } = useAppContext()
	const orbitRef = useRef()

	useEffect(() => {
		if (!orbitRef.current) return

		const cleanup = orbit(orbitRef.current, neoData)
		return () => cleanup && cleanup()
	}, [neoData])
	
	return (
		<div>
			<h2 style={{ 
				textAlign: 'center', 
				fontFamily: 'GoogleSans',
				marginTop: 50
			}}>
				Orbit View
			</h2>
			
			<Box 
			ref={orbitRef}
			sx={{
				border: '2px solid white',
				height: 500,
				width: 900,
				margin: 4,
				justifySelf: 'center'
			}} />
		</div>
	)
}

export default OrbitView
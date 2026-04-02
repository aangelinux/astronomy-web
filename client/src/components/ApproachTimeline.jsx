/**
 * Renders a timeline of Close Approaches.
 */

import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../hooks/context.jsx'
import { filterApproachesBy } from '../api/neos.js'
import { Button, Typography } from '@mui/material'
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'
import { chart } from '../js/timeline.js'

function ApproachTimeline() {
	const { neoData } = useAppContext()
	const [decade, setDecade] = useState(0) // Change to 1900 later
	const [approaches, setApproaches] = useState([])
	const [hoverData, setHoverData] = useState(null)
	const svgRef = useRef()

	useEffect(() => {
		async function fetchApproaches() {
			const data = await filterApproachesBy(decade)
			setApproaches(data)
		}
		fetchApproaches()
	}, [decade])

	useEffect(() => {
		if (!approaches.length) return
		chart(svgRef.current, approaches, setHoverData)
	}, [approaches])

	useEffect(() => {
		if (!neoData?.close_approaches?.length) return
		
		const date = new Date(neoData.close_approaches[0].date)
		const year = date.getFullYear()
		const decade = Math.floor(year / 10) * 10
		setDecade(decade)
	}, [neoData])

	const handleClick = (direction) => {
		// Change to real decades later
		if (direction === 'next' && decade < 1500) {
			setDecade(prevDecade => prevDecade + 100) 
		}
		if (direction === 'prev' && decade > 0) {
			setDecade(prevDecade => prevDecade - 100) 
		}
	}
	
	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Close Approaches: Timeline</h2>

			<Button variant="outlined" onClick={() => handleClick('prev')} sx={{ margin: 2 }}>
				<ArrowLeft />
				<Typography sx={{ textAlign: 'center' }}>Prev</Typography>
			</Button>

			<Button variant="outlined" onClick={() => handleClick('next')}>
				<Typography sx={{ textAlign: 'center' }}>Next</Typography>
				<ArrowRight />
			</Button>

			<svg ref={svgRef}></svg>
			{hoverData && (
				<div
					style={{
						position: "fixed",
						top: hoverData.y + 10,
						left: hoverData.x + 10,
						background: "rgba(0,0,0,0.8)",
						color: "white",
						padding: "10px",
						borderRadius: "8px",
						pointerEvents: "none",
						fontSize: "0.8rem"
					}}>
						<p>SPK-ID: {hoverData.data.spkid}</p>
						<p>Date: {new Date(hoverData.data.date).toLocaleString('sv-SE')}</p>
						<p>Distance: {hoverData.data.minimum_distance_km} km</p>
						<p>Velocity: {hoverData.data.relative_velocity_km_s} km/s</p>
						<p>Rarity: {hoverData.data.rarity}</p>
				</div>
			)}
		</div>
	)
}

export default ApproachTimeline
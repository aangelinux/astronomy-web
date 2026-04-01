/**
 * Renders a timeline of Close Approaches.
 */

import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../hooks/context.jsx'
import { filterApproachesBy } from '../api/neos.js'
import { Button, Typography } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { chart } from '../js/timeline.js'

function ApproachTimeline() {
	const { neoData } = useAppContext()
	const [decade, setDecade] = useState(1900)
	const [approaches, setApproaches] = useState([])
	const [hoverData, setHoverData] = useState(null)
	const svgRef = useRef()

	useEffect(() => {
		async function fetchApproaches() {
			const data = await filterApproachesBy()
			setApproaches(data)
		}
		fetchApproaches()
	}, [decade])

	useEffect(() => {
		if (!approaches.length) return
		chart(svgRef.current, approaches, setHoverData)
	}, [approaches])

	useEffect(() => {
	}, [hoverData])

	const handleClick = () => {
		setDecade(prevDecade => prevDecade + 10)
	}
	
	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Close Approaches: Timeline</h2>
			<Button variant="contained" onClick={handleClick}>
				<ArrowRightAltIcon />
				<Typography>Next</Typography>
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
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
	// Axis for timeline/earth representation
	// Graph for NEO placement
	// X-axis -> Time, placement: (365 / CA-date)
	// Y-axis -> Earth distance, placement: (Minimum distance)

	const { neoData } = useAppContext()
	const [decade, setDecade] = useState(1900)
	const [approaches, setApproaches] = useState([])
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
		chart(svgRef.current, approaches)
	}, [approaches])

	const handleClick = () => {
		setDecade(prevDecade => prevDecade + 10)
	}
	
	return (
		<div>
			<Button variant="contained" onClick={handleClick}>
				<ArrowRightAltIcon></ArrowRightAltIcon>
				<Typography>Next</Typography>
			</Button>

			<div>
				<svg ref={svgRef}></svg>
			</div>
		</div>
	)
}

export default ApproachTimeline
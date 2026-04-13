/**
 * Renders a timeline of Close Approaches.
 */

import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context.jsx'
import { filterApproachesBy } from '../api/neos.js'
import { Button, Typography } from '@mui/material'
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'
import { chart } from './js/timeline.js'

function ApproachTimeline() {
  const { neoData } = useAppContext()
  const [year, setYear] = useState(1900)
  const [hoverData, setHoverData] = useState(null)
  const svgRef = useRef()

  useEffect(() => {
    async function fetchApproaches() {
      const yearString = `${year.toString()}-`
      const data = await filterApproachesBy(yearString)
      if (!data?.length) return
      chart(svgRef.current, data, setHoverData)
    }
    fetchApproaches()
  }, [year])

  useEffect(() => {
    if (!neoData?.close_approaches?.length) return

    const date = new Date(neoData.close_approaches[0].date)
    const year = date.getFullYear()
    setYear(year)
  }, [neoData])

  const handleClick = (direction) => {
    if (direction === 'next' && year < 2026) {
      setYear(prevYear => prevYear + 1)
    }
    if (direction === 'prev' && year > 0) {
      setYear(prevYear => prevYear - 1)
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
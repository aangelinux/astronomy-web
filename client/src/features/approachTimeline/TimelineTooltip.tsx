/**
 * Renders a tooltip displaying approach data.
 */

import { HoverData, TimelineTooltipProps } from './types'
import useWindowSize from '../../useWindowSize'

function TimelineTooltip({ hoverData }: TimelineTooltipProps) {
  if (!hoverData) 
    return null

  const size = useWindowSize() as { width: number, height: number }

  const yOffset = () => {
    let y
    hoverData.y > 400 
      ? y = 190
      : y = 0
    
    return y
  }

  const xOffset = () => {
    let x
    hoverData.x > (size['width'] / 2)
      ? x = 170
      : x = 0

    return x
  }

  const tooltipStyle: Object = {
    position: 'fixed',
    top: hoverData.y - yOffset(),
    left: hoverData.x - xOffset(),
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    pointerEvents: 'none',
    fontSize: '0.8rem',
  }

  return (
    <div style={tooltipStyle}>
      <p>SPK-ID: {hoverData.data.spkid}</p>
      <p>Date: {new Date(hoverData.data.date).toLocaleString('sv-SE')}</p>
      <p>Distance: {hoverData.data.minimum_distance_km} km</p>
      <p>Velocity: {hoverData.data.relative_velocity_km_s} km/s</p>
      <p>Rarity: {hoverData.data.rarity}</p>
    </div>
  )
}

export default TimelineTooltip
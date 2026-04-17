/**
 * Renders a tooltip displaying approach data.
 */

function TimelineTooltip({ hoverData }) {
  if (!hoverData) 
    return null

  const tooltipStyle = {
    position: 'fixed',
    top: hoverData.y + 10,
    left: hoverData.x + 10,
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    pointerEvents: 'none',
    fontSize: '0.8rem',
  }

  return (
    <div>
      {hoverData && (
        <div style={tooltipStyle}>
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

export default TimelineTooltip
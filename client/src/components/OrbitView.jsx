/**
 * Renders a view of a NEO's orbit.
 */

import { useEffect, useRef } from 'react'
import { useAppContext } from '../context.jsx'
import { Box } from '@mui/material'
import { orbit } from './js/orbit.js'

function OrbitView() {
  const { neoData } = useAppContext()
  const orbitRef = useRef()

  useEffect(() => {
    if (!orbitRef.current) return

    const orbitData = {
      eccentricity: 0.7202,
      axis_au: 3.49,
      inclination_deg: 6.8,
      node_deg: 13.75,
      peri_deg: 347.63,
      mean_anomaly_deg: 46.69
    }
    const cleanup = orbit(orbitRef.current, orbitData)

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
          height: 400,
          width: 900,
          margin: 4,
          justifySelf: 'center'
        }} />
    </div>
  )
}

export default OrbitView
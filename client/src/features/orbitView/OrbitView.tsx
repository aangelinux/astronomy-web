/**
 * Renders an interactive 3D view of an orbit.
 */

import { Box } from '@mui/material'
import useOrbit from './useOrbit'

function OrbitView() {
  const orbitView = useOrbit()

  const boxStyle = {
    border: '2px solid white',
    height: 400,
    width: '80%',
    margin: 4,
    justifySelf: 'center'
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: 50 }}>
        Orbit View
      </h2>

      <Box
        sx={boxStyle}
        ref={orbitView}
      />
    </div>
  )
}

export default OrbitView
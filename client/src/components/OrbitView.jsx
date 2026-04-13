/**
 * Renders a view of a NEO's orbit.
 */

import { useEffect, useRef } from 'react'
import { useAppContext } from '../context.jsx'
import { Box } from '@mui/material'
import { setup, renderOrbit, cleanup } from './js/orbit.js'

function OrbitView() {
  const { neoData } = useAppContext()
  const containerRef = useRef(null)
  const setupRef = useRef({})

  useEffect(() => {
    const container = containerRef.current
    setupRef.current = setup(container)

    return () => cleanup(setupRef.current, container)
  }, [])

  useEffect(() => {
    if (!setupRef.current || !(Object.keys(neoData)?.length)) return

    const orbitData = neoData.orbit
    const animation = renderOrbit(orbitData, setupRef.current)

    return () => animation?.() // Cancels current animation
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
        ref={containerRef}
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
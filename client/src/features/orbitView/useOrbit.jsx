/**
 * Contains hooks and logic for the OrbitView component.
 */

import { setup, renderOrbit, cleanup } from './orbit3D.js'
import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../../context.jsx'

function useOrbit() {
  const { neoData } = useAppContext()
  const orbitRef = useRef(null)
  const setupRef = useRef({})

  useEffect(() => {
    const orbit = orbitRef.current
    setupRef.current = setup(orbit)

    return () => cleanup(setupRef.current, orbit)
  }, [])

  useEffect(() => {
    if (!setupRef.current || !(Object.keys(neoData)?.length)) 
      return

    const orbitData = neoData.orbit
    const animation = renderOrbit(orbitData, setupRef.current)

    return () => animation?.() // Cancels current animation
  }, [neoData])

  return orbitRef
}

export default useOrbit
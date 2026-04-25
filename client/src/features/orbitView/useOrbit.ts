/**
 * Custom hook containing logic for the OrbitView component.
 */

import { SceneObjects } from './types'
import { setup, renderOrbit, cleanup } from './orbit3D'
import { RefObject, useEffect, useRef } from 'react'
import { useAppContext } from '../../context'

/**
 * Custom hook that handles display and cleanup of a Three.js viewport.
 * Sets up the 3D environment on intial render and updates the orbit
 * every time the neoData hook changes.
 */
function useOrbit(): RefObject<HTMLElement | null> {
  const { neoData } = useAppContext()
  const orbitRef = useRef<HTMLElement>(null)
  const setupRef = useRef<SceneObjects | null>(null)

  useEffect(() => {
    const orbit = orbitRef.current
    if (!orbit) 
      return

    setupRef.current = setup(orbit)

    return () => { 
      if (setupRef.current) {
        cleanup(setupRef.current, orbit)
      }
    }
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
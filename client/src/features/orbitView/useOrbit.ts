/**
 * Custom hook containing logic for the OrbitView component.
 */

import { SceneObjects } from './types'
import { setup, renderOrbit, cleanup } from './orbit3D'
import { RefObject, useEffect, useRef } from 'react'
import { useAppContext } from '../../hooks/context'

/**
 * Custom hook that handles display and cleanup of a Three.js viewport.
 * Sets up the 3D environment on intial render and updates the orbit
 * every time the neoData hook changes.
 */
function useOrbit(): RefObject<HTMLElement | null> {
  const { neoData } = useAppContext()
  const orbitViewRef = useRef<HTMLElement>(null)
  const sceneObjectsRef = useRef<SceneObjects | null>(null)

  useEffect(() => {
    const viewport = orbitViewRef.current
    if (!viewport)
      return

    sceneObjectsRef.current = setup(viewport)

    return () => {
      if (sceneObjectsRef.current) {
        cleanup(sceneObjectsRef.current, viewport)
      }
    }
  }, [])

  useEffect(() => {
    if (!sceneObjectsRef.current || !neoData)
      return

    const orbitData = neoData.orbit
    const animation = renderOrbit(orbitData, sceneObjectsRef.current)

    return () => animation?.() // Cancels current animation
  }, [neoData])

  return orbitViewRef
}

export default useOrbit
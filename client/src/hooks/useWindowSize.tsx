/**
 * Custom hook that keeps track of the browser's window size.
 */

import { useLayoutEffect, useState } from 'react'

type WindowSize = {
  width: number
  height: number
}

function useWindowSize(): WindowSize | {} {
  const [size, setSize] = useState<WindowSize | {}>({})

  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight})
    }
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export default useWindowSize
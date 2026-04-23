/**
 * Custom hook storing the browser's window size.
 */

import { useLayoutEffect, useState } from 'react'

function useWindowSize() {
  const [size, setSize] = useState({})

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
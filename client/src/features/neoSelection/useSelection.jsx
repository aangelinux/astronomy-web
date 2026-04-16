/**
 * Contains hooks and logic for the NeoSelection component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../context.jsx'
import { filterNeosBy, getNeoData } from './api.js'

function useSelection() {
  const { setNeoData } = useAppContext()
  const [options, setOptions] = useState([])
  const [neo, setNeo] = useState('')

  const fetchOptions = (query) => {
    if (!query) return

    const timer = setTimeout(async () => {
      const neos = await filterNeosBy(query)
      setOptions(neos)
    }, 500)
    return () => clearTimeout(timer)
  }

  const handleClick = async () => {
    const data = await getNeoData(neo.spkid)
    setNeoData(data)
  }
  
  return { setNeo, fetchOptions, options, handleClick }
}

export default useSelection
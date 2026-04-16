/**
 * Contains hooks and logic for the NeoSelection component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../context.jsx'
import { filterNeosBy, getNeoSpkid, getNeoData } from './api.js'

function useSelection() {
  const { setNeoData } = useAppContext()
  const [neo, setNeo] = useState("")
  const [options, setOptions] = useState([])

  const fetchOptions = (query) => {
    if (!query) return
    const timer = setTimeout(async () => {
      const data = await filterNeosBy(query)
      const neos = data.map((neo) => neo.name)
      setOptions(neos)
    }, 500)

    return () => clearTimeout(timer)
  }

  const handleClick = async () => {
    const spkid = await getNeoSpkid(neo)
    const data = await getNeoData(spkid)

    setNeoData(data)
  }
  
  return { setNeo, fetchOptions, options, handleClick }
}

export default useSelection
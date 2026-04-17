/**
 * Contains hooks and logic for the NeoSelection component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../context.jsx'
import { filterNeosBy, getNeoData } from './api.js'

function useSelection() {
  const { setNeoData } = useAppContext()
  const [options, setOptions] = useState([])
  const [input, setInput] = useState('')
  const [neo, setNeo] = useState('')

  useEffect(() => {
    if (!input) 
      return

    const timer = setTimeout(async () => {
      const neos = await filterNeosBy(input)
      setOptions(neos)
    }, 500)

    return () => clearTimeout(timer)
  }, [input])

  const handleClick = async () => {
    if (!neo) 
      return

    try {
      const data = await getNeoData(neo.spkid)
      setNeoData(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return { setNeo, setInput, options, handleClick }
}

export default useSelection
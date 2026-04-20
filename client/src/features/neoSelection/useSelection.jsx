/**
 * Contains hooks and logic for the NeoSelection component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../context.jsx'
import { filterNeosBy, getNeoData } from './api.js'

function useSelection() {
  const { setNeoData, setError } = useAppContext()
  const [options, setOptions] = useState([])
  const [input, setInput] = useState('')
  const [neo, setNeo] = useState('')
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    if (!input)
      return

    const timer = setTimeout(async () => {
      try {
        const neos = await filterNeosBy(input)
        setOptions(neos)
      } catch (error) {
        console.log(error)
        setError('Failed to fetch NEOs')
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [input])

  const handleClick = async () => {
    if (!neo) {
      setAlert(true)
      return
    }
    try {
      const data = await getNeoData(neo.spkid)
      setNeoData(data)
      setAlert(false)
    } catch (error) {
      console.log(error)
      setError('Failed to fetch NEO data')
    }
  }
  
  return { setInput, options, setNeo, handleClick, alert }
}

export default useSelection
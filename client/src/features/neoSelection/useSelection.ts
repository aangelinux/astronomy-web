/**
 * Custom hook containing logic for the NeoSelection component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../hooks/context'
import { filterNeosBy, fetchNeoDataBy } from './api'
import { NeoIdentifiers, NeoSelectionProps } from './types'

/**
 * Handles input from the search-bar and sets up an autocomplete
 * feature with a debounce pattern.
 */
function useSelection(): NeoSelectionProps {
  const { setNeoData, setError } = useAppContext()

  const [input, setInput] = useState<string>('')
  const [options, setOptions] = useState<NeoIdentifiers[]>([])
  const [neo, setNeo] = useState<NeoIdentifiers | null>(null)
  const [alert, setAlert] = useState<boolean>(false)

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
      const data = await fetchNeoDataBy(neo.spkid)
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
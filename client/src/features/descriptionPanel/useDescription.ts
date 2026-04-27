/**
 * Custom hook containing logic for the DescriptionPanel component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../hooks/context'
import { fetchAIResponse } from './api'

/**
 * Fetches an AI-generated description of the selected NEO.
 */
function useDescription(): { description: string, loading: boolean } {
  const { neoData, setError } = useAppContext()
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!neoData)
      return

    async function fetchDescription() {
      setLoading(true)
      try {
        const response = await fetchAIResponse(neoData!)
        setDescription(response)
      } catch (error) {
        console.log(error)
        setError('Failed to fetch AI response')
      }
      setLoading(false)
    }

    fetchDescription()
  }, [neoData])

  return { description, loading }
}

export default useDescription
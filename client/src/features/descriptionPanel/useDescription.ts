/**
 * Custom hook containing logic for the DescriptionPanel component.
 */

import { DescriptionPanelProps } from './types'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context'
import { fetchAIResponse } from './api'

function useDescription(): DescriptionPanelProps {
  const { neoData, setError } = useAppContext()
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!(Object.keys(neoData)?.length)) 
      return

    async function fetchDescription() {
      setLoading(true)
      try {
        const response = await fetchAIResponse(neoData)
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
/**
 * Contains hooks and logic for the DescriptionPanel component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../context.jsx'
import { fetchAIResponse } from './api.js'

function useDescription() {
  const { neoData, setError } = useAppContext()
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

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
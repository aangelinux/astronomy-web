/**
 * Contains hooks and logic for the DescriptionPanel component.
 */

import { useState, useEffect } from 'react'
import { useAppContext } from '../../context.jsx'
import { fetchAIResponse } from './api.js'

function useDescription() {
  const { neoData } = useAppContext()
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!(Object.keys(neoData)?.length)) 
      return

    async function fetchDescription() {
      try {
        setLoading(true)
        const response = await fetchAIResponse(neoData)
        setDescription(response)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchDescription()
  }, [neoData])

  return { description, loading }
}

export default useDescription
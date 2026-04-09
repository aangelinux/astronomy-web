/**
 * Panel displaying an AI-generated description.
 */

import { Box, Card, CardContent } from '@mui/material'
import { useAppContext } from '../context.jsx'
import { useState, useEffect } from 'react'
import { fetchAIResponse } from '../api/genai.js'

function AIPanel() {
  const { neoData } = useAppContext()
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (!(Object.keys(neoData)?.length)) return
    async function fetchDescription() {
      try {
        const response = await fetchAIResponse(neoData)
        setDescription(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDescription()
  }, [neoData])

  const card = (
    <CardContent>
      {description || 'AI generated content here ...'}
    </CardContent>
  )

  return (
    <Box sx={{
      minWidth: 275,
      boxShadow: 1,
      borderRadius: 2,
      fontFamily: 'GoogleSans',
      fontWeight: 'bold',
      textAlign: 'center'
    }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}

export default AIPanel
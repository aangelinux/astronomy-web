/**
 * Panel displaying an AI-generated description.
 */

import { Box, Card, CardContent, Typography } from '@mui/material'
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
    <CardContent sx={{ height: 225, maxWidth: 500, justifySelf: 'center' }}>
      <Typography variant='h6' sx={{
        fontFamily: 'GoogleSans',
        fontWeight: 'bold',
        paddingTop: 1,
        paddingBottom: 1,
        border: 'none'
      }}>
        AI-Generated Description
      </Typography>
      {description || 'AI generated content here ...'}
    </CardContent>
  )

  return (
    <Box sx={{
      boxShadow: 1,
      borderRadius: 2,
      fontFamily: 'GoogleSans',
      fontSize: '.95rem',
      textAlign: 'center'
    }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}

export default AIPanel
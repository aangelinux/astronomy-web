/**
 * Fetches dynamic responses from Google's Gemini API.
 */

export async function fetchAIResponse(input) {
  const url = 'http://localhost:3001/genai'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })

  if (!res.ok) {
    const errors = {
      503: 'Model is temporarily unavailable due to high demand. Please try again later.',
      429: 'Rate limit exceeded. Please limit requests to 5 per minute and 20 per day.'
    }
    if (errors[res.status])
      return errors[res.status]

    throw new Error('Error fetching AI response: ', 
      res.statusText || res.status)
  }

  const result = await res.json()

  return result
}
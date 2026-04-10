/**
 * Fetches dynamic responses from a Gemini AI chatbot.
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
    return errors[res.status]
  }

  const result = await res.json()

  return result
}
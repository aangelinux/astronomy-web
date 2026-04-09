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

  const result = await res.json()
  if (!res.ok) {
    throw new Error(`Error fetching GenAI: ${result.message}`)
  }

  return result
}
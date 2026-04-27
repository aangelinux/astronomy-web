import { NeoData } from "./types"

/**
 * Fetches a description of the NEO from Google's Gemini API.
 */
export async function fetchAIResponse(input: NeoData): Promise<string> {
  console.log(input)
  const url = '/genai'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })

  if (!res.ok) {
    if (res.status in commonErrors)
      return commonErrors[res.status]

    throw new Error('Error fetching AI response: ', { 
      cause: res.statusText || res.status })
  }

  const result = await res.json()

  return result
}

const commonErrors: { [key: number]: string } = {
  503: 'Model is temporarily unavailable due to high demand. Please try again later.',
  429: 'Rate limit exceeded. Please limit requests to 5 per minute and 20 per day.'
}
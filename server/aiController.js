/**
 * Controller for communicating with APIs serving trained AI-models.
 */

import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

export async function getResponse(req, res, next) {
  const attributes = JSON.stringify(req.body)
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  })

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Generate a description of this Near-Earth Object based on its attributes: ${attributes}.`,
  })

  return response.text
}
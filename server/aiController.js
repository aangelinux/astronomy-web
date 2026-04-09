/**
 * Controller for communicating with GenAI, serving a pre-trained AI-model.
 */

import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

export async function getResponse(req, res, next) {
  const attributes = JSON.stringify(req.body)
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  })

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a 4-5 sentences long, informative description of this 
        Near-Earth Object based on its attributes: ${attributes}.`,
    })
    return res.send(200).json(response.text)
  } catch (error) {
    console.log(error)
    return res.send(error.code).json(error.message)
  }
}
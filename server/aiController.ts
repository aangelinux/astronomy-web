/**
 * Handles requests to Google's Gemini API.
 */

import type { Request, Response } from 'express'
import { GoogleGenAI } from '@google/genai'
import jwt from 'jsonwebtoken'

/**
 * Verifies that the client has a valid JWT stored in their cookies.
 */
export function requireAuth(req: Request, res: Response, next: Function) {
  const token: string = req.cookies.JWT
  if (!token || !process.env.JWT_SECRET)
    return res.sendStatus(401)

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    return res.sendStatus(401)
  }  
}

/**
 * Prompts Gemini to generate a text-based description of the
 * selected Near-Earth Object based on its attributes.
 */
export async function getResponse(req: Request, res: Response) {
  const attributes = JSON.stringify(req.body)
  if (!attributes)
    return res.sendStatus(422)

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  })

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a 4 sentences long informative description 
        of this Near-Earth Object based on its attributes: ${attributes}. 
        Assume that the reader may not have advanced knowledge of astronomy.`,
    })
    return res.status(200).json(response.text)
  } catch (error: any) {
    // API returns error message as a stringified object;
    // using JSON.parse() makes it easier to read
    console.log(JSON.parse(error.message))
    return res.sendStatus(error.status)
  }
}
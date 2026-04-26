/**
 * Handles requests to Google's Gemini API.
 */

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { GoogleGenAI } from '@google/genai'
import type { Request, Response } from 'express'

dotenv.config()

/**
 * Verifies that the client has a valid JWT stored in their cookies.
 */
export function requireAuth(req: Request, res: Response, next: Function) {
  const token = req.cookies.JWT
  if (!token)
    return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    req.body = decoded
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
    return
  
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
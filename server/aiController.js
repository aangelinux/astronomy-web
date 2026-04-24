/**
 * Handles requests to Google's Gemini API.
 * 
 * @typedef { import('express').Request } Request
 * @typedef { import('express').Response } Response
 */

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

/**
 * Verifies that the client has a valid JWT stored in cookies.
 * 
 * @param {Request} req - Express request; expected JWT in req.cookies.JWT.
 * @param {Response} res - Express response.
 * @param {function} next - Express next function.
 * @returns {void}
 */
export function requireAuth(req, res, next) {
  const token = req.cookies.JWT
  if (!token)
    return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.sendStatus(401)
  }  
}

/**
 * Prompts Gemini to generate a text-based description of the
 * selected Near-Earth Object based on its attributes.
 * 
 * @param {Request} req - Express request; expected object with attributes.
 * @param {Response} res - Express response.
 * @returns {Promise<void>}
 */
export async function getResponse(req, res) {
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
  } catch (error) {
    console.log(JSON.parse(error.message))
    return res.sendStatus(error.status)
  }
}
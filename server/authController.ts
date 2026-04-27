/**
 * Controller for handling authentication.
 */

import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import * as service from './authService.ts'

dotenv.config()

/**
 * Verifies that the client has a valid JWT stored in cookies.
 */
export function getAuthenticatedUser(req: Request, res: Response) {
  const token: string | undefined = req.cookies.JWT
  if (!token || !process.env.JWT_SECRET) 
    return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({ user: decoded })
  } catch (error) {
    return res.sendStatus(401)
  }
}

/**
 * Redirects the client to GitHub to get an access code.
 */
export function redirectToGithub(req: Request, res: Response) {
  const clientID = process.env.CLIENT_ID
  const scope = 'user:email'
  const uri = `${process.env.BACKEND_URL}/auth/callback`
  const link = 
  `https://github.com/login/oauth/authorize?` +
  `client_id=${clientID}&response_type=code&`+ 
  `scope=${scope}&redirect_uri=${uri}`

  res.redirect(link)
}

/**
 * Handles GitHub authorization callback.
 */
export async function handleCallback(req: Request, res: Response) {
  if (!req.query.code)
    throw new Error('No access code provided by GitHub')

  const code = req.query.code as string
  const token = await service.fetchAccessToken(code)
  const user = await service.fetchUserData(token)
  const jwt = await service.fetchJWT(user)

  setCookie(req, res, jwt)
}

/**
 * Sets a JWT in the response's cookie header.
 */
export function setCookie(req: Request, res: Response, jwt: string) {
  res.cookie('JWT', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000
  })
}

/**
 * Removes a JWT from the client's cookies.
 */
export function logout(req: Request, res: Response) {
  res.clearCookie('JWT')
  res.sendStatus(200)
}
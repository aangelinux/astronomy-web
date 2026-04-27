/**
 * Express routes.
 */

import type { Request, Response, NextFunction } from 'express'
import express from 'express'
import dotenv from 'dotenv'
import * as authController from './authController.ts'
import * as aiController from './aiController.ts'

dotenv.config()

export const router = express.Router()

const asyncHandler = (fn: any) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

router.get('/auth/me', authController.getAuthenticatedUser)
router.get('/auth/github', authController.redirectToGithub)
router.get('/auth/callback', asyncHandler(async(req: Request, res: Response) => {
  if (!req.query.code)
    return res.sendStatus(401)

  const code = req.query.code as string
  const token = await authController.fetchAccessToken(code)
  const user = await authController.fetchUserData(token)
  const jwt = await authController.fetchJWT(user)

  authController.setCookie(req, res, jwt)
  res.redirect(process.env.ROOT_URL!)
}))

router.post('/logout', authController.logout)
router.post('/genai', aiController.requireAuth, aiController.getResponse)

/**
 * Express routes.
 */

import type { Request, Response, NextFunction, RequestHandler } from 'express'
import * as authController from './authController.ts'
import * as aiController from './aiController.ts'
import express from 'express'

export const router = express.Router()

const asyncHandler = (fn: RequestHandler) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

router.get('/auth/me', authController.getAuthenticatedUser)
router.get('/auth/github', authController.redirectToGithub)
router.get('/auth/callback', asyncHandler(async (req, res) => {
  await authController.handleCallback(req, res)

  if (!process.env.ROOT_URL)
    throw new Error('No root URL provided in env')

  res.redirect(process.env.ROOT_URL)
}))

router.post('/logout', authController.logout)
router.post('/genai', aiController.requireAuth, aiController.getResponse)

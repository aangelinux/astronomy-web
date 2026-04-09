/**
 * Express routes.
 */

import express from 'express'
import * as authController from './authController.js'
import * as aiController from './aiController.js'

export const router = express.Router()

router.get('/auth/me', authController.authenticate)
router.get('/auth/github', authController.redirectToGithub)
router.get('/auth/callback', async (req, res) => {
  const token = await authController.fetchAccessToken(req, res)
  const user = await authController.fetchUserData(token)
  const jwt = await authController.fetchJWT(user)

  authController.setCookie(req, res, jwt)
  res.redirect('http://localhost:3002/dashboard')
})

router.post('/logout', authController.logout)
router.post('/genai', aiController.getResponse)

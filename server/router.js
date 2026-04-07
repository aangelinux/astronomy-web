/**
 * Express routes.
 */

import express from 'express'
import * as controller from './controller.js'

export const router = express.Router()

router.get('/auth/me', controller.authenticate)
router.get('/auth/github', controller.redirectToGithub)
router.get('/auth/callback', async (req, res) => {
  const token = await controller.fetchAccessToken(req.query.code)
  const user = await controller.fetchUserData(token)
  const jwt = await controller.register(user)

  controller.setCookie(req, res, jwt)
  res.redirect('http://localhost:3002/dashboard')
})

router.post('/logout', controller.logout)

router.post('/genai', controller.getResponse)

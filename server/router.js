/**
 * Express routes.
 */

import express from 'express'
import { redirectToGithub, fetchAccessToken, fetchUserData, register } from './controller.js'

export const router = express.Router()

router.get('/auth/github', redirectToGithub)
router.get('/auth/callback', async (req, res) => {
  const token = await fetchAccessToken(req.query.code)
  const user = await fetchUserData(token)
  const jwt = await register(user)

  res.redirect('http://localhost:3002/dashboard') // TODO change URL to auth page and add JWT
})

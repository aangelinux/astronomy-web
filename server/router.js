/**
 * Express routes.
 */

import express from 'express'
import { redirectToGithub, fetchAccessToken, fetchUserData } from './githubController.js'
import { register } from './astronomyController.js'

export const router = express.Router()

router.get('/auth/github', redirectToGithub)
router.get('/auth/callback', async (req, res) => {
	const token = await fetchAccessToken(req.query.code)
	const user = await fetchUserData(token)
	const jwt = await register(user)

	res.redirect(jwt)  // Dashboard URL with JWT token
})
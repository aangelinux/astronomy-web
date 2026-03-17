/**
 * Controllers for external APIs.
 */

import dotenv from 'dotenv'
import { AuthorizationCode } from 'simple-oauth2'

dotenv.config()

const config = {
	client: {
		id: process.env.CLIENT_ID,
		secret: process.env.CLIENT_SECRET
	},
	auth: {
    tokenHost: 'https://github.com',
    authorizePath: '/login/oauth/authorize',
    tokenPath: '/login/oauth/access_token'
	}
}

export async function redirectToGithub(req, res, next) {
	const client = new AuthorizationCode(config)

	const authorizationURI = client.authorizeURL({
		redirect_uri: 'http://localhost:3001/auth/callback',
		scope: 'user:email'
	})

	res.redirect(authorizationURI)
}

export async function fetchAccessToken(code) {
	const tokenParams = {
		code,
		redirect_uri: 'http://localhost:3001/auth/callback'
	}

	try {
		const client = new AuthorizationCode(config)
		return await client.getToken(tokenParams)
	} catch (error) {
		console.log('Access token error: ', error.message)
	}
}

export async function fetchUserData(token) {
	const response = await fetch(`https://api.github.com/user`, {
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${token.token.access_token}`
		}
	})
	
	const result = await response.json()
	if (!response.ok) {
		throw new Error('Error fetching user data ', error.message)
	}

	return result.email
}

export async function register(email) {
	console.log(email)
}
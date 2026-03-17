/**
 * Controller for external APIs.
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

export async function fetchAccessToken(authCode) {
	const tokenParams = {
		redirect_uri: 'http://localhost:3001/auth/callback',
		code: authCode
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

	return {
		username: result.email || result.id,
		provider: 'GitHub',
		providerID: result.id
	}
}

export async function register({ username, provider, providerID }) {
	const response = await fetch('https://astronomy-api-production.up.railway.app/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({ query: 
			`mutation LoginOAuth {
				loginOAuth(input: { 
					username: "${username}", 
					provider: "${provider}", 
					providerID: ${providerID} 
				}) 
				{
					token
				}
			}`
		})
	})

	const result = await response.json()
	if (!response.ok) {
		throw new Error('Error fetching user data ', error.message)
	}	

	return result.data.loginOAuth.token
}
/**
 * Controller for handling authentication.
 * 
 * @typedef { import('express').Request } Request
 * @typedef { import('express').Response } Response
 */

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

/**
 * Verifies that the client has a valid JWT stored in cookies.
 * 
 * @param {Request} req - Express request; expected JWT in req.cookies.JWT.
 * @param {Response} res - Express response.
 * @returns {void}
 */
export function getAuthenticatedUser(req, res) {
  const token = req.cookies.JWT
  if (!token) 
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
 * 
 * @param {Request} req - Express request.
 * @param {Response} res - Express response; redirects to GitHub.
 * @returns {void}
 */
export function redirectToGithub(req, res) {
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
 * Exchanges an access code for an access token on GitHub.
 * 
 * @param {Request} req - Express request; expected to have access code.
 * @param {Response} res - Express response.
 * @returns {Promise<string>} GitHub access token.
 */
export async function fetchAccessToken(req, res) {
  const code = req.query.code
  const clientID = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const uri = `${process.env.BACKEND_URL}/auth/callback`
  const link = 
  `https://github.com/login/oauth/access_token?` + 
  `client_id=${clientID}&client_secret=${clientSecret}&` + 
  `code=${code}&redirect_uri=${uri}`

  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error(`Error fetching access token: ${response.status}`)
  }

  const result = await response.json()
  const accessToken = result.access_token

  return accessToken
}

/**
 * Fetches the user's personal data using an access token.
 * 
 * @param {string} token - GitHub access token.
 * @returns {Promise<{ username: string|number, provider: string, 
 * providerID: number }>}
 */
export async function fetchUserData(token) {
  const url = 'https://api.github.com/user'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Error fetching user data: ${response.status}`)
  }
  const result = await response.json()

  return {
    username: result.email || result.id,
    provider: 'GitHub',
    providerID: result.id,
  }
}

/**
 * Calls a third-party API to register/login the user and receives a JWT.
 * 
 * @param {{ username: string|number, provider: string, providerID: number }}
 * @returns {Promise<string>} JWT.
 */
export async function fetchJWT({ username, provider, providerID }) {
  const url = 'https://astronomy-api-production.up.railway.app/'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({
      query:
      `mutation LoginOAuth {
        loginOAuth(input: { 
          username: "${username}", 
          provider: "${provider}", 
          providerID: ${providerID} 
        }) 
        {
          token
        }
      }`,
    }),
  })

  if (!response.ok) {
    throw new Error(`Error registering user: ${response.status}`)
  }
  const result = await response.json()
  const jwt = result.data.loginOAuth.token

  return jwt
}

/**
 * Sets the JWT in the response's cookie header.
 * 
 * @param {Request} req - Express request.
 * @param {Response} res - Express response.
 * @param {string} jwt - Valid JWT.
 * @returns {void}
 */
export function setCookie(req, res, jwt) {
  res.cookie('JWT', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000
  })
}

/**
 * Removes the JWT from the cookie header.
 * 
 * @param {Request} req - Express request.
 * @param {Response} res - Express response; sends status 200.
 * @returns {void}
 */
export function logout(req, res) {
  res.clearCookie('JWT')
  res.sendStatus(200)
}
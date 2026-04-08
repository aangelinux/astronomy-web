/**
 * Controller for handling authentication.
 */

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export function authenticate(req, res) {
  const token = req.cookies.JWT
  if (!token) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({ user: decoded })
  } catch (error) {
    return res.sendStatus(401)
  }
}

export async function redirectToGithub(req, res) {
  const clientID = process.env.CLIENT_ID
  const scope = 'user:email'
  const uri = 'http://localhost:3001/auth/callback'
  const link = `https://github.com/login/oauth/authorize?client_id=${clientID}&response_type=code&scope=${scope}&redirect_uri=${uri}`

  res.redirect(link)
}

export async function fetchAccessToken(req, res) {
  const clientID = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const code = req.query.code
  const uri = 'http://localhost:3001/auth/callback'
  const link = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}&redirect_uri=${uri}`

  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    }
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error('Error fetching user data ', error.message)
  }
  const accessToken = result.access_token

  return accessToken
}

export async function fetchUserData(token) {
  const url = 'https://api.github.com/user'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error('Error fetching user data ', error.message)
  }

  return {
    username: result.email || result.id,
    provider: 'GitHub',
    providerID: result.id,
  }
}

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

  const result = await response.json()
  if (!response.ok) {
    throw new Error('Error fetching user data ', error.message)
  }
  const jwt = result.data.loginOAuth.token

  return jwt
}

export function setCookie(req, res, jwt) {
  res.cookie('JWT', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000
  })

  res.redirect('http://localhost:3002/dashboard')
}

export function logout(req, res) {
  res.clearCookie('JWT')
  res.sendStatus(200)
}
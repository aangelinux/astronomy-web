/**
 * OAuth service functions.
 */

import dotenv from 'dotenv'

dotenv.config()

interface UserData {
  username: string
  provider: string
  providerID: string
}

/**
 * Exchanges an access code for an access token on GitHub.
 */
export async function fetchAccessToken(code: string) {
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
  const accessToken: string = result.access_token

  return accessToken
}

/**
 * Fetches a GitHub user's profile data using an access token.
 */
export async function fetchUserData(token: string): Promise<UserData> {
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
 * Calls a third-party API to register/login a user and receive a JWT.
 */
export async function fetchJWT({ username, provider, providerID }: UserData) {
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
  const jwt: string = result.data.loginOAuth.token

  return jwt
}
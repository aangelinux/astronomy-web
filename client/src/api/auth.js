/**
 * Functions for handling authentication.
 */

export async function authenticate() {
  const url = 'http://localhost:3001/auth/me'
  const res = await fetch(url, { credentials: 'include' })
  
  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  return res.json()
}

export async function logout() {
  const url = 'http://localhost:3001/logout'
  const res = await fetch(url, {
    credentials: 'include',
    method: 'POST'
  })
  
  if (!res.ok) {
    throw new Error('Error logging out')
  }

  return res
}
/**
 * Functions for handling authentication.
 */

export async function authenticate() {
  const url = 'http://localhost:3001/auth/me'
  const res = await fetch(url, { credentials: 'include' })
  const result = await res.json()
  
  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  return result
}

export async function logout() {
  const url = 'http://localhost:3001/logout'
  const res = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const result = await res.json()
  
  if (!res.ok) {
    throw new Error('Error logging out')
  }

  return result
}
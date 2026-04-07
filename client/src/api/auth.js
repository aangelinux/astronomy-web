/**
 * Authenticates users.
 */

export async function authenticate() {
  const url = 'http://localhost:3001/auth/me'
  const res = await fetch(url, { credentials: 'include' })
  const result = await res.json()
  
  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  console.log(result)
  return result
}
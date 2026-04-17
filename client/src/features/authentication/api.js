/**
 * Authenticates the user with GitHub.
 */

export async function authenticate() {
  const url = 'http://localhost:3001/auth/me'
  const res = await fetch(url, { credentials: 'include' })

  if (!res.ok) {
    throw new Error('Unauthorized: ', error.message)
  }

  return res.json()
}
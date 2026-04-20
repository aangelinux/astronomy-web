/**
 * Authenticates the user with GitHub.
 */

export async function authenticate() {
  const url = '/auth/me'
  const res = await fetch(url, { credentials: 'include' })

  if (!res.ok) {
    throw new Error('Unauthorized: ', res.statusText || res.status)
  }

  return res.json()
}
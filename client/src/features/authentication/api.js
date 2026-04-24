/**
 * Verifies that the user is authorized to use the application.
 * 
 * @returns {JSON}
 */
export async function authenticate() {
  const url = '/auth/me'
  const res = await fetch(url, { credentials: 'include' })

  if (!res.ok) {
    throw new Error('Unauthorized: ', { 
      details: res.statusText || res.status })
  }

  return res.json()
}
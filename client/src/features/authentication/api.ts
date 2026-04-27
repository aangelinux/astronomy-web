/**
 * Verifies that the user is authorized to use the application.
 */
export async function authenticate(): Promise<JSON> {
  const url = '/auth/me'
  const res = await fetch(url, { credentials: 'include' })

  if (!res.ok) {
    throw new Error('Unauthorized: ', { 
      cause: res.statusText || res.status })
  }

  return res.json()
}
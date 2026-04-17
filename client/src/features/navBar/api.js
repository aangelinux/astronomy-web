/**
 * Logs out an authorized user.
 */

export async function logout() {
  const url = 'http://localhost:3001/logout'
  const res = await fetch(url, {
    credentials: 'include',
    method: 'POST'
  })
  
  if (!res.ok) {
    throw new Error('Error logging out: ', 
      res.statusText || res.status)
  }

  return res
}
/**
 * Logs out an authorized user.
 * 
 * @returns {string}
 */
export async function logout() {
  const url = '/logout'
  const res = await fetch(url, {
    credentials: 'include',
    method: 'POST'
  })

  if (!res.ok) {
    throw new Error('Error logging out: ', { 
      details: res.statusText || res.status })
  }

  return res
}
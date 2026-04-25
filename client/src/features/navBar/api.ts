export async function logout(): Promise<Object> {
  const url = '/logout'
  const res = await fetch(url, {
    credentials: 'include',
    method: 'POST'
  })

  if (!res.ok) {
    throw new Error('Error logging out: ', { 
      cause: res.statusText || res.status })
  }

  return res
}
/**
 * Fetches yearly NEO approach data from a third-party API.
 * 
 * @param {number} year - Year to filter approaches by.
 * @returns {array[{ 
 *  date: string, 
 *  minimum_distance_km: number, 
 *  relative_velocity_km_s: number, 
 *  rarity: number, 
 *  spkid: string 
 * }]}
 */
export async function filterApproachesBy(year) {
  const limit = 1200
  const url = 'https://astronomy-api-production.up.railway.app/'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Close_approaches {
          close_approaches(input: { date: "${year}", limit: ${limit} }) {
            approaches {
              spkid
              date
              minimum_distance_km
              relative_velocity_km_s
              rarity
            }
          }
        }`
    })
  })

  if (!res.ok) {
    throw new Error('Error fetching approach data: ', { 
      details: res.statusText || res.status })
  }

  const result = await res.json()
  const approaches = result.data.close_approaches.approaches

  return approaches
}
/**
 * Fetches NEO data from the Astronomy API.
 */

const url = 'https://astronomy-api-production.up.railway.app/'

export async function filterNeos(limit = 20, offset = 0) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Neos {
          neos(input: {
            limit: ${limit},
            offset: ${offset}
          }) {
            neos {
              spkid
              name
              earth_moid_ld
              magnitude
              rotation_hours
              pot_hazardous_asteroid
            }
          }
        }`
    })
  })

  if (!res.ok) {
    throw new Error('Error fetching NEO data: ', error.message)
  }
  const result = await res.json()

  return result.data.neos.neos
}
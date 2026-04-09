/**
 * Fetches NEO data from the Astronomy API.
 */

const url = 'https://astronomy-api-production.up.railway.app/'

export async function filterNeosBy(name) {
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
            limit: 5,
            name: "${name}"
          }) {
            neos {
              name
            }
          }
        }`
    })
  })

  const result = await res.json()
  if (!res.ok) {
    throw new Error('Error fetching NEO data: ', error.message)
  }

  return result.data.neos.neos
}

export async function getNeoSpkid(name) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Neos {
          neos(input: { name: "${name}" }) {
            neos {
              spkid
            }
          }
        }`
    })
  })

  const result = await res.json()
  if (!res.ok) {
    throw new Error('Error fetching NEO spkid: ', error.message)
  }

  return result.data.neos.neos[0].spkid
}

export async function getNeoData(spkid) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Neo {
          neo(spkid: "${spkid}") {
            spkid
            name
            earth_moid_ld
            magnitude
            rotation_hours
            pot_hazardous_asteroid
            close_approaches {
              date
              minimum_distance_km
              relative_velocity_km_s
              rarity
            }
          }
        }`
    })
  })

  const result = await res.json()
  if (!res.ok) {
    throw new Error('Error fetching NEO data: ', error.message)
  }

  return result.data.neo
}

export async function filterApproachesBy(decade) {
  // Fix decade filtering later
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Close_approaches {
          close_approaches(input: { limit: 100, offset: ${decade} }) {
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

  const result = await res.json()
  if (!res.ok) {
    throw new Error('Error fetching Close Approach data: ', error.message)
  }

  return result.data.close_approaches.approaches
}

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

  const result = await res.json()
  if (!res.ok) {
    throw new Error('Error fetching NEO data: ', error.message)
  }

  return result.data.neos.neos
}
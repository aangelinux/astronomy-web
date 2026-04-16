/**
 * Fetches NEO data from the astronomy API.
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

  if (!res.ok) {
    throw new Error('Error fetching NEO data: ', error.message)
  }
  const result = await res.json()

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

  if (!res.ok) {
    throw new Error('Error fetching NEO spkid: ', error.message)
  }
  const result = await res.json()

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
            orbit {
              eccentricity
              axis_au
              inclination_deg
              node_deg
              peri_deg
              mean_anomaly_deg
            }
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

  if (!res.ok) {
    throw new Error('Error fetching NEO data: ', error.message)
  }
  const result = await res.json()

  return result.data.neo
}
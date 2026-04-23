/**
 * Fetches NEO data from the astronomy API.
 */

const url = 'https://astronomy-api-production.up.railway.app/'

/**
 * Fetches NEOs by name.
 * 
 * @param {string} name - Name to filter NEOs by.
 * @returns {array[{ 
 *  name: string,
 *  spkid: string
 * }]}
 */
export async function filterNeosBy(name) {
  const limit = 5
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Neos {
          neos(input: { limit: ${limit}, name: "${name}" }) {
            neos {
              name
              spkid
            }
          }
        }`
    })
  })

  if (!res.ok) {
    throw new Error('Error fetching NEOs: ', 
      res.statusText || res.status)
  }

  const result = await res.json()
  const neos = result.data.neos.neos

  return neos
}

/**
 * Fetches NEO data by its spkid.
 * 
 * @param {string} spkid - Spkid of the selected NEO.
 * @returns {object}
 */
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
    throw new Error('Error fetching NEO data: ', 
      res.statusText || res.status)
  }

  const result = await res.json()
  const data = result.data.neo

  return data
}
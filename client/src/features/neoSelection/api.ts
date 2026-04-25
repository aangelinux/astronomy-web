/**
 * Fetches NEO data from the astronomy API.
 */

import { NeoData } from "../descriptionPanel/types"
import { NeoIdentifiers } from "./types"

const url = 'https://astronomy-api-production.up.railway.app/'

/**
 * Filters by name and fetches the spkid and name of matching NEOs.
 */
export async function filterNeosBy(input: string): Promise<NeoIdentifiers[]> {
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
          neos(input: { limit: ${limit}, name: "${input}" }) {
            neos {
              name
              spkid
            }
          }
        }`
    })
  })

  if (!res.ok) {
    throw new Error('Error fetching NEOs: ', { 
      cause: res.statusText || res.status })
  }

  const result = await res.json()
  const neos = result.data.neos.neos

  return neos
}

/**
 * Fetches the data of an individual NEO by its spkid.
 */
export async function fetchNeoDataBy(spkid: string): Promise<NeoData> {
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
    throw new Error('Error fetching NEO data: ', { 
      cause: res.statusText || res.status })
  }

  const result = await res.json()
  const data = result.data.neo

  return data
}
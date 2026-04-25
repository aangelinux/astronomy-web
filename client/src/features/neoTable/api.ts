/**
 * Fetches NEO data from the Astronomy API.
 */

import { NeoMainData } from "./types"

const url = 'https://astronomy-api-production.up.railway.app/'

/**
 * Fetches multiple NEOs and their main attributes, by offset.
 */
export async function filterNeos(limit = 20, offset = 0): Promise<NeoMainData[]> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Neos {
          neos(input: { limit: ${limit}, offset: ${offset} }) {
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
    throw new Error('Error fetching NEO data: ', { 
      cause: res.statusText || res.status })
  }

  const result = await res.json()
  const neos = result.data.neos.neos

  return neos
}

/**
 * Fetches the total number of entries in table Near-Earth Objects.
 */
export async function getTotalNeoCount(): Promise<number> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({
      query:
        `query Query {
          neoCount
        }`
    })
  })

  if (!res.ok) {
    throw new Error('Error fetching NEO count: ', { 
      cause: res.statusText || res.status })
  }

  const result = await res.json()
  const count = result.data.neoCount

  return count
}
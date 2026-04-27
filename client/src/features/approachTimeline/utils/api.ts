/**
 * Fetches Close Approach data from the Astronomy API.
 */

import { ApproachData } from '../types'

export async function filterApproachesBy(year: string): Promise<ApproachData[]> {
  const limit: number = 1200
  const url: string = 'https://astronomy-api-production.up.railway.app/'

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
      cause: res.statusText || res.status })
  }

  const result = await res.json()
  const approaches: ApproachData[] = result.data.close_approaches.approaches

  return approaches
}
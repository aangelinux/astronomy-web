/**
 * Fetches NEO data from the Astronomy API.
 */

const url = 'https://astronomy-api-production.up.railway.app/'

export async function filterNeosBy(input) {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({ query: 
			`query Neos {
				neos(input: {
					limit: 5,
					name: "${input}"
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
		throw new Error ('Error fetching NEO data: ', error.message)
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
		body: JSON.stringify({ query: 
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
		throw new Error ('Error fetching NEO spkid: ', error.message)
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
		body: JSON.stringify({ query: 
			`query Neo {
				neo(spkid: "${spkid}") {
					spkid
					name
					earth_moid_ld
					magnitude
					rotation_hours
					pot_hazardous_asteroid
				}
			}`
		})
	})

	const result = await res.json()
	if (!res.ok) {
		throw new Error ('Error fetching NEO data: ', error.message)
	}

	return result.data.neo
}
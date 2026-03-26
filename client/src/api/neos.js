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

	return result.data.neos
}
/**
 * Fetches NEO data from the Astronomy API.
 */

const url = 'https://astronomy-api-production.up.railway.app/'

export async function filterNeosBy(input) {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*',
		},
		body: JSON.stringify({ query: 
			`query Neos {
				neos(input: { 
					limit: 5, 
					page: 1,
					name: "${input}"
				}) 
				{
					name
				}
			}`,
		})
	})

	const result = res.json()
	if (!res.ok) {
		throw new Error ('Error fetching NEO data: ', error.message)
	}

	console.log(result)
}
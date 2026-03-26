/**
 * Panel displaying NEO attributes and description.
 */

import { useState, useEffect } from 'react'
import { fetchGenAI } from '../api/genai.js'

function InfoPanel() {
	useEffect(() => {
		async function fetchData() {
			const testData = {
				name: '460P/PANSTARRS',
				earth_moid_ld: 6.33,
				rotation_hours: 36.6
			}
			return await fetchGenAI(testData)
		}

		console.log(fetchData())
	}, [])

	return (
		<div>
			<p>{}</p>
		</div>
	)
}

export default InfoPanel
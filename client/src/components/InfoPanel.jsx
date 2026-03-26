/**
 * Panel displaying NEO attributes and description.
 */

import { useState, useEffect } from 'react'
import { fetchGenAI } from '../api/genai.js'
import { useAppContext } from '../hooks/context.jsx'

function InfoPanel() {
	const { neo } = useAppContext()
	const [description, setDescription] = useState("")

	useEffect(() => {
		if (!neo) return

		const fetchData = async (neo) => {
			let response = await fetchGenAI({ neo })
			data = await response.json()
			setDescription(data)
		}

		fetchData(neo)
		console.log(description)
	}, [neo, description])

	return (
		<div>
			<p>{description}</p>
		</div>
	)
}

export default InfoPanel
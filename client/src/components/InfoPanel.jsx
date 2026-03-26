/**
 * Panel displaying NEO attributes and description.
 */

import { useState, useEffect } from 'react'
import { fetchGenAI } from '../api/genai.js'
import { useAppContext } from '../hooks/context.jsx'

function InfoPanel() {
	const { neo } = useAppContext()
	const [description, setDescription] = useState("")
		
	async function fetchData(neo) {
		return await fetchGenAI({ neo })
	}

	useEffect(() => {
		if (!neo) return

		setDescription(fetchData(neo))
		console.log(description)
	}, [neo])

	return (
		<div>
			<p>{description}</p>
		</div>
	)
}

export default InfoPanel
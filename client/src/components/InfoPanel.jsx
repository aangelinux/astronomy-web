/**
 * Panel displaying an AI-generated description of a NEO.
 */

import { useState, useEffect } from 'react'
import { fetchGenAI } from '../api/genai.js'
import { useAppContext } from '../hooks/context.jsx'

function InfoPanel() {
	const { neo } = useAppContext()
	const [description, setDescription] = useState("")

	useEffect(() => {
		if (!neo) return
		const fetchData = async () => {
			try {
				const response = await fetchGenAI({ neo })
				setDescription(response)
			} catch (error) {
				console.error(error.message)
			}
		}
		console.log(description)
		fetchData()
	}, [neo])

	return (
		<div>
			<p>{description}</p>
		</div>
	)
}

export default InfoPanel
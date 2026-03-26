/**
 * React context for the application.
 */

import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
	const [neo, setNeo] = useState('')

	return (
		<AppContext.Provider value={{ neo, setNeo }}>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext)
}
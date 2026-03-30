/**
 * React context for the application.
 */

import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
	const [neoData, setNeoData] = useState({})

	return (
		<AppContext.Provider value={{ neoData, setNeoData }}>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext)
}
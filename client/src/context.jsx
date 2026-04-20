/**
 * Contains state that's used by multiple components.
 */

import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [neoData, setNeoData] = useState({})
  const [error, setError] = useState(null)

  return (
    <AppContext.Provider value={{ 
      neoData, setNeoData,
      error, setError
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
/**
 * Object storing custom hooks that are used by multiple components.
 */

import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { NeoData } from './features/descriptionPanel/types'

interface Context {
  neoData: NeoData | null
  error: string | null
  setNeoData: (data: NeoData | null) => void
  setError: (data: string | null) => void
}

const AppContext = createContext<Context>({ 
  neoData: null, 
  error: null, 
  setNeoData: () => {},
  setError: () => {}
})

export function AppProvider({ children }: PropsWithChildren) {
  const [neoData, setNeoData] = useState<NeoData | null>(null)
  const [error, setError] = useState<string | null>(null)

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
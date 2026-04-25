import { NeoData } from "./features/descriptionPanel/types"

export type ContextObject = {
  neoData: NeoData
  setNeoData: React.Dispatch<React.SetStateAction<NeoData>> 
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
}

export type WindowSize = {
  width: number
  height: number
}
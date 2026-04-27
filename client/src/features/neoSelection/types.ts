import { ApproachData } from '../approachTimeline/types'
import { RawOrbitData } from '../orbitView/types'

export type NeoIdentifiers = {
  spkid: string
  name: string
}

export type NeoSelectionProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>
  options: NeoIdentifiers[]
  setNeo: React.Dispatch<React.SetStateAction<NeoIdentifiers | null>>
  handleClick: () => void
  alert: boolean
}

export type NeoData = {
  spkid: string,
  name: string,
  earth_moid_ld: number,
  magnitude: number | null,
  rotation_hours: number | null,
  pot_hazardous_asteroid: boolean,
  orbit: RawOrbitData,
  close_approaches: ApproachData[] | null
}
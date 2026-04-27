import { ApproachData } from '../approachTimeline/types'
import { RawOrbitData } from '../orbitView/types'

export type DescriptionPanelProps = {
  description: string
  loading: boolean
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
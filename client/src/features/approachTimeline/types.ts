export type ApproachTimelineProps = {
  year: number
  alert: boolean
  svgRef: React.RefObject<SVGElement|null>
  hoverData: HoverData | null
  handlePrev: () => void
  handleNext: () => void
  handleSubmit: () => void
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export type HoverData = {
  data: ApproachData
  x: number
  y: number
}

export type ApproachData = {
  spkid: string
  date: string
  minimum_distance_km: number
  relative_velocity_km_s: number
  rarity: number
}

export type TimelineControlsProps = {
  handlePrev: () => void
  handleNext: () => void
  handleSubmit: () => void
  setInput: React.Dispatch<React.SetStateAction<string>>
  alert: boolean
}

export type ChartActiveData = {
  groups_: SVGGElement[]
  parents_: SVGGElement[]
}
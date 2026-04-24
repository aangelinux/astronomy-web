export type ApproachTimelineProps = {
  year: number
  alert: boolean
  svgRef: React.RefObject<SVGSVGElement|null>
  hoverData: HoverData | null
  handlePrev: () => void
  handleNext: () => void
  handleSubmit: () => void
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export type TimelineControlsProps = {
  handlePrev: () => void
  handleNext: () => void
  handleSubmit: () => void
  setInput: React.Dispatch<React.SetStateAction<string>>
  alert: boolean
}

export type TimelineTooltipProps = {
  hoverData: HoverData | null
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

export type ChartData = {
  groups_: SVGGElement[]
  parents_: SVGGElement[]
}
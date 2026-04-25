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

export type ChartElements = {
  groups_: SVGGElement[]
  parents_: SVGGElement[]
}

export type ChartParams = {
  svgElement: SVGElement
  data: ApproachData[]
  setHoverData: React.Dispatch<React.SetStateAction<HoverData | null>>
}

export type ChartDataPoints = {
  svg: SVGElement
  mirroredData: ApproachData[]
  x: number
  y: number
  setHoverData: React.Dispatch<React.SetStateAction<HoverData | null>>
}
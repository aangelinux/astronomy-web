import { ScaleTime, ScaleLinear, Selection, BaseType } from 'd3'

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

export type Chart = Selection<SVGGElement | BaseType, ApproachData, SVGGElement, unknown>

export type ChartParams = {
  svgElement: SVGElement
  data: ApproachData[]
  setHoverData: React.Dispatch<React.SetStateAction<HoverData | null>>
}

export type ChartDataPoints = {
  svg: Selection<SVGElement, unknown, null, undefined>
  mirroredData: ApproachData[]
  x: ScaleTime<number, number, never>
  y: ScaleLinear<number, number, never>
  setHoverData: React.Dispatch<React.SetStateAction<HoverData | null>>
}
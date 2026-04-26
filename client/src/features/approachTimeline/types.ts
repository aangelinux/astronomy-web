import { Selection, BaseType, ScaleTime, ScaleLinear } from 'd3'

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>
export type SVGSelection = Selection<SVGElement, unknown, null, undefined>
export type TimeScale = ScaleTime<number, number, never>

export type ApproachTimelineProps = {
  year: number
  alert: boolean
  svgRef: React.RefObject<SVGSVGElement|null>
  hoverData: HoverData | null
  handlePrev: () => void
  handleNext: () => void
  handleSubmit: () => void
  setInput: StateSetter<string>
}

export type TimelineControlsProps = {
  handlePrev: () => void
  handleNext: () => void
  handleSubmit: () => void
  setInput: StateSetter<string>
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

export type Chart = Selection<SVGGElement | BaseType, ApproachData, SVGGElement, unknown>

export type ChartParams = {
  svgElement: SVGElement
  data: ApproachData[]
  setHoverData: StateSetter<HoverData | null>
}

export type ChartObjects = {
  svg: SVGSelection
  x: ScaleTime<number, number, never>
  y: ScaleLinear<number, number, never>
  approachData: ApproachData[]
  setHoverData: StateSetter<HoverData | null>
}
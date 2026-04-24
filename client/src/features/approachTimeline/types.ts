import { RefObject } from 'react'

export type ApproachTimelineProps = {
  year: number
  alert: boolean
  svgRef: RefObject<SVGElement>
  hoverData: HoverData | null
  handlePrev: Function
  handleNext: Function
  handleSubmit: Function
  setInput: Function
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
  handlePrev: Function
  handleNext: Function
  handleSubmit: Function
  setInput: Function
  alert: boolean
}

export type ChartActiveData = {
  groups_: Array<SVGGElement>
  parents_: Array<SVGGElement>
}
/**
 * Creates a chart displaying close approach events over time, using D3.js.
 */

import { 
  Chart, 
  ChartParams, 
  ChartObjects, 
  ApproachData, 
  HoverData, 
  StateSetter, 
  SVGSelection, 
  TimeScale 
} from '../types'
import * as d3 from 'd3'
import asteroidImg from '../../../../assets/asteroid.png'

/**
 * Renders a D3.js scatter plot representing a timeline of events.
 * Each datapoint represents an event where the x-axis represents time 
 * and y-axis represents distance from the Earth during the event.
 */
export const setup = (params: ChartParams): Chart | null => {
  const { svgElement, data, setHoverData } = params
  if (!data.length) 
    return null

  const width = svgElement.parentElement?.clientWidth || 500
  const height = 400
  const svg = d3.select(svgElement)
    .attr("width", width)
    .attr("height", height)

  // Clear all previous data
  svg.selectAll("*").remove()

  const x = createHorizontalScale(width, data)
  const y = createVerticalScale(height, data)
  const approachData = mirrorApproachData(data)
  const chart = renderApproaches({ svg, x, y, approachData, setHoverData })

  // Rendered last so it's not obscured
  renderXAxis(svg, height, x)

  return chart
}

/**
 * When a NEO with a recorded approach event is selected, its event
 * is highlighted and all other events on display are greyed-out.
 */
export const toggleActive = (chart: Chart, selectedSpkid: string) => {
  if (!chart || !selectedSpkid) 
    return
  
  chart.each(function(approach) {
    if (approach.spkid === selectedSpkid) {
      d3.select(this)
        .select("image")
        .transition()
        .duration(150)
        .attr("cursor", "pointer")
        .attr("width", 30)
        .attr("height", 30)
        .attr("x", -15)
        .attr("y", -15)
        .style("filter", "brightness(1.5)")

    } else {
      d3.select(this)
        .style("opacity", .4)
    }
  })
}

/**
 * Beginning of year -> End of year
 */
function createHorizontalScale(width: number, data: ApproachData[]) {
  const year = d3.extent(data, d => new Date(d.date))
  if (!year[0] || !year[1]) 
    throw new Error('Error rendering horizontal scale: invalid domain')

  const x = d3.scaleUtc()
    .domain(year)
    .range([40, width - 30])

  return x
}

/**
 * -(Largest distance value) -> Largest distance value
 */
function createVerticalScale(height: number, data: ApproachData[]) {
  const maxDistance = d3.max(data, d => d.minimum_distance_km) ?? 0
  const y = d3.scaleLinear()
    .domain([-maxDistance, maxDistance])
    .range([height - 20, 20])

  return y
}

/**
 * Adds a negative sign to half of all approaches' distance;
 * this renders half above the x-axis and other half below.
 * Will make the chart look less crowded
 */
function mirrorApproachData(data: ApproachData[]) {
  const mirroredData = data.map((d, index) => ({
    ...d,
    signedDistance: index % 2 === 0
      ? d.minimum_distance_km
      : -d.minimum_distance_km
  }))

  return mirroredData
}

function renderApproaches(chartObjects: ChartObjects) {
  const { svg, x, y, approachData, setHoverData } = chartObjects

  const chart = svg.append("g")
    .selectAll("g")
    .data(approachData)
    .join("g")
    .attr("transform", d => {
      const xPos = x(new Date(d.date))
      const yPos = y(d.signedDistance)
      return `translate(${xPos}, ${yPos})`
    })
    .on("mouseover", (event: any) => onHover(event, setHoverData))
    .on("mouseleave", (event: any) => onLeave(event, setHoverData))
  
  chart.append("image")
    .attr("href", asteroidImg)
    .attr("height", 18)
    .attr("width", 18)
    .attr("x", -9) // Center image
    .attr("y", -9)

  return chart
}

function onHover(event: any, setHoverData: StateSetter<HoverData | null>) {
  d3.select(event.target)
    .transition()
    .duration(150)
    .attr("cursor", "pointer")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", -15)
    .attr("y", -15)
    .style("filter", "brightness(1.5)")

  setHoverData({
    data: event.target.__data__,
    x: event.clientX,
    y: event.clientY
  })
}

function onLeave(event: any, setHoverData: StateSetter<HoverData | null>) {
  d3.select(event.target)
    .select("image")
    .transition()
    .duration(150)
    .attr("width", 18)
    .attr("height", 18)
    .attr("x", -9)
    .attr("y", -9)
    .style("filter", "brightness(1)")

  setHoverData(null)
}

function renderXAxis(svg: SVGSelection, height: number, x: TimeScale) {
  svg.append("g")
    .attr("transform", `translate(0, ${height / 2})`)

    .call(d3.axisBottom(x)
      .ticks(d3.utcMonth.every(2))
      .tickFormat(d => (d as Date).toLocaleDateString(
        'en-US', { month: 'long', year: 'numeric' }
      )))

    .call(g => g.selectAll(".tick line")
      .remove())

    .call(g => g.selectAll(".tick text")
      .attr("font-family", "GoogleSans")
      .attr("font-size", ".8rem")
      .attr("font-weight", "bold"))

    .call(g => g.selectAll(".tick")
      .append("circle")
      .attr("r", 4)
      .attr("fill", "white"))
      
    .call(g => g.selectAll(".tick")
      .append("circle")
      .attr("r", 7)
      .attr("fill", "white")
      .attr("opacity", .4))
}
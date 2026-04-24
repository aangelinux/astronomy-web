/**
 * Creates a chart displaying close approach events over time, using D3.js.
 * 
 * @typedef {{ groups_: array[SVGGElement], parents_: array[SVGGElement] }} currentData
 */

import * as d3 from 'd3'
import asteroidImg from '../../../../assets/asteroid.png'

/**
 * Renders a D3.js scatter plot representing a timeline of events.
 * Each datapoint represents an event where the x-axis represents time 
 * and y-axis represents distance from the Earth during the event.
 * 
 * @param {SVGElement} svgElement - Container for the chart.
 * @param {array[{ 
 *  spkid: string, 
 *  date: string, 
 *  minimum_distance_km: number, 
 *  relative_velocity_km_s: number, 
 *  rarity: number 
 * }]} data - Array of datapoint objects (events) to render.
 * @param {function} hoverData - Handler to set the data of an event.
 * @returns {currentData}
 */
export const chart = (svgElement, data, hoverData) => {
  if (!data.length) return

  const width = svgElement.parentElement.clientWidth
  const height = 400
  const svg = d3.select(svgElement)
    .attr("width", width)
    .attr("height", height)

  // Clear all previous data
  svg.selectAll("*").remove()

  const x = createHorizontalScale(width, data)
  const y = createVerticalScale(height, data)
  const mirroredData = mirrorData(data)
  const currentData = renderData({ svg, mirroredData, x, y, hoverData })

  // Rendered last so it's not obscured by datapoints
  renderXAxis(svg, height, x)

  return currentData
}

/**
 * When a NEO with a recorded approach event is selected, its event
 * is highlighted and all other events on display are greyed-out.
 * 
 * @param {currentData} currentData - Data currently on display.
 * @param {string} selectedSpkid - SPK-ID of the selected NEO.
 * @returns {void}
 */
export const toggleActive = (currentData, selectedSpkid) => {
  if (!currentData || !selectedSpkid) 
    return
  
  currentData.each(function(d) {
    if (d.spkid === selectedSpkid) {
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


function createHorizontalScale(width, data) {
  const x = d3.scaleUtc()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([40, width - 30])

  return x
}

function createVerticalScale(height, data) {
  const maxDistance = d3.max(data, d => d.minimum_distance_km)
  const y = d3.scaleLinear()
    .domain([-maxDistance, maxDistance])
    .range([height - 20, 20])

  return y
}

function mirrorData(data) {
  // Adds a negative sign to half of all datapoints; 
  // this renders half above the x-axis and half below.
  // Makes the chart look less crowded
  const mirroredData = data.map((d, index) => ({
    ...d,
    signedDistance: index % 2 === 0
      ? d.minimum_distance_km
      : -d.minimum_distance_km
  }))

  return mirroredData
}

function renderData({ svg, mirroredData, x, y, hoverData }) {
  const datapoints = svg.append("g")
    .selectAll("g")
    .data(mirroredData)
    .join("g")
    .attr("transform", d => {
      const xPos = x(new Date(d.date))
      const yPos = y(d.signedDistance)
      return `translate(${xPos}, ${yPos})`
    })
    .on("mouseover", (event) => onHover(event, hoverData))
    .on("mouseleave", (event) => onLeave(event, hoverData))
  
  datapoints.append("image")
    .attr("href", asteroidImg)
    .attr("height", 18)
    .attr("width", 18)
    .attr("x", -9) // Center image
    .attr("y", -9)

  return datapoints
}

function onHover(event, hoverData) {
  d3.select(event.target)
    .transition()
    .duration(150)
    .attr("cursor", "pointer")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", -15)
    .attr("y", -15)
    .style("filter", "brightness(1.5)")

  hoverData({
    data: event.target.__data__,
    x: event.clientX,
    y: event.clientY
  })
}

function onLeave(event, hoverData) {
  d3.select(event.target)
    .select("image")
    .transition()
    .duration(150)
    .attr("width", 18)
    .attr("height", 18)
    .attr("x", -9)
    .attr("y", -9)
    .style("filter", "brightness(1)")

  hoverData(null)
}

function renderXAxis(svg, height, x) {
  svg.append("g")
    .attr("transform", `translate(0, ${height / 2})`)

    .call(d3.axisBottom(x)
      .ticks(d3.utcMonth.every(2))
      .tickFormat(d => d.toLocaleString('en-US', 
        { month: 'long', year: 'numeric' })))

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
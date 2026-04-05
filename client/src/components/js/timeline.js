/**
 * Renders a chart with a timeline of close approaches, using D3.js.
 */

import * as d3 from 'd3'

export const chart = (svgElement, data, hoverData) => {
	const width = innerWidth - 100
  const height = 400
  const svg = d3.select(svgElement)
    .attr("width", width)
    .attr("height", height)

  svg.selectAll("*").remove() // Clear previous data

  const x = createHorizontalScale(width, data)
  const y = createVerticalScale(height, data)

	renderDatapoints({ svg, data, x, y, hoverData })
	renderXAxis(svg, height, x) // Rendered last so nothing obscures it
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

function renderDatapoints({ svg, data, x, y, hoverData }) {
	// Add a negative sign to half of the datapoints; 
	// renders half above x-axis, other half below
	const mirroredData = data.map((d, i) => ({
		...d,
		signedDistance: i % 2 === 0
			? d.minimum_distance_km
			: -d.minimum_distance_km
	}))

	svg.append("g")
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
		.append("image")
			.attr("href", "../../assets/asteroid.png")
			.attr("height", 18)
			.attr("width", 18)
			.attr("x", -9) // Center image
			.attr("y", -9)
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
			.ticks(d3.utcMonth.every(3))
			.tickFormat(d => d <= d3.utcYear(d) ? d.getUTCFullYear() : null))
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
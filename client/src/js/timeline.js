/**
 * Creates an SVG element with D3, representing a timeline.
 */

import * as d3 from 'd3'

export const chart = (svgElement, data) => {
	const width = innerWidth - 100
  const height = 500

	// Create SVG-container element
  const svg = d3.select(svgElement)
    .attr("width", width)
    .attr("height", height)

	// Clear previous renders
  svg.selectAll("*").remove()

	// Create horizontal scale
  const x = d3.scaleUtc()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([40, width - 30])

	// Create vertical scale
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.minimum_distance_km))
    .range([height / 2, 20])

	// Render x-axis
  svg.append("g")
    .attr("transform", `translate(0, ${height / 2})`)
    .call(d3.axisBottom(x)
			.ticks(d3.utcMonth.every(3))
			.tickFormat(d => d <= d3.utcYear(d) ? d.getUTCFullYear() : null))
		.call(g => g.selectAll(".tick line")
			.remove())
		.call(g => g.selectAll(".tick")
			.append("circle")
			.attr("r", 4)
			.attr("fill", "white"))
		.call(g => g.selectAll(".tick")
			.append("circle")
			.attr("r", 7)
			.attr("fill", "white")
			.attr("opacity", .4))
		.call(g => g.selectAll(".tick text")
			.attr("font-family", "GoogleSans")
			.attr("font-size", ".75rem"))

	// Render all datapoints
	const datapoints = svg.append("g")
		.selectAll("g")
		.data(data)
		.join("g")
		.attr("transform", d => {
			const xPos = x(new Date(d.date))
			const yPos = y(d.minimum_distance_km)
			return `translate(${xPos}, ${yPos})`
		})

	// Add asteroid image to each datapoint
	datapoints.append("image")
		.attr("href", "../../assets/asteroid.png")
		.attr("height", 18)
		.attr("width", 18)
		.attr("x", -9) // Center image
		.attr("y", -9)
}
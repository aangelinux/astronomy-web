/**
 * Custom hook containing logic for the ApproachTimeline component.
 */

import { ApproachTimelineProps, Chart, HoverData } from './types'
import { filterApproachesBy } from './utils/api'
import { setup, highlightApproach } from './utils/timelineChart'
import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../../hooks/context'
import useWindowSize from '../../hooks/useWindowSize'

/**
 * Adds the D3 chart to a ref and handles input from the search-bar 
 * and navigation buttons. Re-renders the chart if a selected NEO 
 * has any recorded close approaches.
 */
function useTimeline(): ApproachTimelineProps {
  const { neoData, setError } = useAppContext()

  const [year, setYear] = useState<number>(1900)
  const [input, setInput] = useState<string>('')
  const [chart, setChart] = useState<Chart | null>(null)
  const [hoverData, setHoverData] = useState<HoverData | null>(null)
  const [hasApproach, setHasApproach] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)

  const svgRef = useRef<SVGSVGElement>(null)
  const size = useWindowSize() as { width: number, height: number }

  useEffect(() => {
    setHasApproach(false)

    if (!neoData?.close_approaches?.length)
      return
    const date = new Date(neoData.close_approaches[0].date)
    const year = date.getFullYear()

    setYear(year)
    setHasApproach(true)
  }, [neoData])

  useEffect(() => {
    const yearString = `${year.toString()}-`

    async function fetchApproaches() {
      try {
        const data = await filterApproachesBy(yearString)
        if (!data?.length || !svgRef.current)
          return

        const svgElement = svgRef.current
        setChart(setup({ svgElement, data, setHoverData }))
      } catch (error) {
        console.log(error)
        setError('Failed to fetch approach data')
      }
    }

    fetchApproaches()
  }, [year, size['width']])

  useEffect(() => {
    if (!hasApproach || !chart || !neoData?.spkid)
      return

    highlightApproach(chart, neoData.spkid)
  }, [hasApproach, chart])

  const handlePrev = () => {
    setHasApproach(false)
    if (year > 1900) {
      setYear(prevYear => prevYear - 1)
    }
  }

  const handleNext = () => {
    setHasApproach(false)
    if (year < 2026) {
      setYear(prevYear => prevYear + 1)
    }
  }

  const handleSubmit = () => {
    if (!input || Number(input) < 1900 || Number(input) > 2026) {
      setAlert(true)
      return
    }
    const inputYear = new Date(input).getFullYear()

    if (!inputYear) {
      setAlert(true)
      return
    }
    setYear(inputYear)
    setHasApproach(false)
    setAlert(false)
  }

  return {
    year,
    alert,
    svgRef,
    hoverData,
    handlePrev,
    handleNext,
    handleSubmit,
    setInput,
  }
}

export default useTimeline
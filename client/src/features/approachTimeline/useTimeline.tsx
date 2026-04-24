/**
 * Custom hook containing logic for the ApproachTimeline component.
 */

import { ApproachTimelineProps, ChartActiveData, HoverData } from './types'
import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../../context'
import { filterApproachesBy } from './utils/api'
import { chart, toggleActive } from './utils/timelineChart'
import useWindowSize from '../../useWindowSize'

function useTimeline (): ApproachTimelineProps {
  const { neoData, setError } = useAppContext()

  const [year, setYear] = useState<number>(1900)
  const [input, setInput] = useState<string>('')
  const [datapoints, setDatapoints] = useState<ChartActiveData | null>(null)
  const [hoverData, setHoverData] = useState<HoverData | null>(null)
  const [activeEvent, setActiveEvent] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)

  const svgRef = useRef<SVGElement>(null)
  const size = useWindowSize() as { width: number, height: number }

  useEffect(() => {
    setActiveEvent(false)

    if (!neoData?.close_approaches?.length) 
      return
    const date = new Date(neoData.close_approaches[0].date)
    const year = date.getFullYear()

    setYear(year)
    setActiveEvent(true)
  }, [neoData])

  useEffect(() => {
    const yearString = `${year.toString()}-`

    async function fetchApproaches() {
      try {
        const data = await filterApproachesBy(yearString)
        if (!data?.length || !svgRef.current) 
          return
        
        setDatapoints(chart(svgRef.current, data, setHoverData))
      } catch (error) {
        console.log(error)
        setError('Failed to fetch approach data')
      }
    }

    fetchApproaches()
  }, [year, size['width']])

  useEffect(() => {
    if (!datapoints || !neoData?.spkid || !activeEvent) 
      return

    toggleActive(datapoints, neoData.spkid)
  }, [activeEvent, datapoints])

  const handlePrev = () => {
    setActiveEvent(false)
    if (year > 1900) {
      setYear(prevYear => prevYear - 1)
    }
  }

  const handleNext = () => {
    setActiveEvent(false)
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
    setActiveEvent(false)
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
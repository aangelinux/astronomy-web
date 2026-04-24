/**
 * Contains hooks and logic for the ApproachTimeline component.
 * 
 * @typedef { import('react').RefObject } Ref
 * 
 * @typedef {Object} timelineProps
 * @property {number} year
 * @property {boolean} alert
 * @property {Ref<SVGElement>} svgRef
 * @property {object | null} hoverData
 * @property {function} handlePrev
 * @property {function} handleNext
 * @property {function} handleSubmit
 * @property {function} setInput
 */

import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../../context.jsx'
import { filterApproachesBy } from './utils/api.js'
import { chart, toggleActive } from './utils/timelineChart.js'
import useWindowSize from '../../useWindowSize.jsx'

/**
 * Custom hook that handles timeline data and interactivity.
 * 
 * @returns {timelineProps}
 */
function useTimeline() {
  const { neoData, setError } = useAppContext()
  const [year, setYear] = useState(1900)
  const [input, setInput] = useState('')
  const [datapoints, setDatapoints] = useState(null)
  const [hoverData, setHoverData] = useState(null)
  const [activeEvent, setActiveEvent] = useState(false)
  const [alert, setAlert] = useState(false)
  const svgRef = useRef()
  const size = useWindowSize()

  useEffect(() => {
    setActiveEvent(false)

    if (!neoData?.close_approaches?.length) 
      return
    const date = new Date(neoData.close_approaches[0].date)
    if (!date) 
      return
    const year = date.getFullYear()

    setYear(year)
    setActiveEvent(true)
  }, [neoData])

  useEffect(() => {
    const yearString = `${year.toString()}-`

    async function fetchApproaches() {
      try {
        const data = await filterApproachesBy(yearString)
        if (!data?.length) 
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
    if (!input || input < 1900 || input > 2026) {
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
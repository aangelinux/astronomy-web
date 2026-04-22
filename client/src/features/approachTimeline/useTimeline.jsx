/**
 * Contains hooks and logic for the ApproachTimeline component.
 */

import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../../context.jsx'
import { filterApproachesBy } from './utils/api.js'
import { chart, toggleActive } from './utils/timelineChart.js'

function useTimeline() {
  const { neoData, setError } = useAppContext()
  const [input, setInput] = useState(null)
  const [year, setYear] = useState(1900)
  const [datapoints, setDatapoints] = useState(null)
  const [hoverData, setHoverData] = useState(null)
  const [alert, setAlert] = useState(false)
  const svgRef = useRef()

  useEffect(() => {
    if (!neoData?.close_approaches?.length) 
      return
    const date = new Date(neoData.close_approaches[0].date)
    if (!date) 
      return

    const year = date.getFullYear()
    setYear(year)
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
  }, [year])

  useEffect(() => {
    if (!datapoints || !neoData?.spkid) 
      return

    toggleActive(datapoints, neoData.spkid)
  }, [datapoints, neoData])

  const handlePrev = () => {
    if (year > 1900) {
      setYear(prevYear => prevYear - 1)
    }
  }

  const handleNext = () => {
    if (year < 2026) {
      setYear(prevYear => prevYear + 1)
    }
  }

  const handleSubmit = () => {
    if (!input) {
      setAlert(true)
      return
    }
    const inputYear = new Date(input).getFullYear()
    if (!inputYear || inputYear < 1900 || inputYear > 2026) {
      setAlert(true)
      return
    }
    
    setYear(inputYear)
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
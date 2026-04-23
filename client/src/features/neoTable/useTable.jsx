/**
 * Contains hooks and logic for the NeoTable component.
 */

import { useState, useEffect } from 'react'
import { filterNeos, getTotalNeoCount } from './api.js'
import { useAppContext } from '../../context.jsx'

/**
 * Custom hook that handles table data and interactivity.
 * 
 * @returns {{
 *  neos: array[{ 
 *    spkid: string, 
 *    name: string, 
 *    earth_moid_ld: number,
 *    magnitude: number | null, 
 *    rotation_hours: number | null, 
 *    pot_hazardous_asteroid: boolean 
 *  }],
 *  page: number,
 *  rowsPerPage: number,
 *  totalRows: number | null,
 *  handleChangePage: function,
 *  handleChangeRowsPerPage: function
 * }}
 */
function useTable() {
  const { setError } = useAppContext()
  const [neos, setNeos] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalRows, setTotalRows] = useState(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        const count = await getTotalNeoCount()
        setTotalRows(count)
      } catch (error) {
        console.log(error)
        setError('Failed to fetch total NEO count')
      }
    }
    fetchCount()
  }, [])

  useEffect(() => {
    const limit = rowsPerPage
    const offset = rowsPerPage * page
    async function fetchNeos() {
      try {
        const data = await filterNeos(limit, offset)
        setNeos(data)
      } catch (error) {
        console.log(error)
        setError('Failed to fetch NEOs')
      }
    }
    fetchNeos()
  }, [page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return { 
    neos, 
    page, 
    rowsPerPage, 
    totalRows, 
    handleChangePage, 
    handleChangeRowsPerPage 
  }
}

export default useTable
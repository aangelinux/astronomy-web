/**
 * Contains hooks and logic for the NeoTable component.
 * 
 * @typedef {object} tableProps
 * @property {array[neoData]} neos
 * @property {number} newPage
 * @property {number} rowsPerPage
 * @property {number | null} totalRows
 * @property {function} handleChangePage
 * @property {function} handleChangeRowsPerPage
 * 
 * @typedef {object} neoData
 * @property {string} spkid
 * @property {string} name
 * @property {number} earth_moid_ld
 * @property {number | null} magnitude
 * @property {number | null} rotation_hours
 * @property {boolean} pot_hazardous_asteroid
 */

import { useState, useEffect } from 'react'
import { filterNeos, getTotalNeoCount } from './api.js'
import { useAppContext } from '../../context.jsx'

/**
 * Custom hook that handles table data and interactivity.
 * 
 * @returns {tableProps}
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
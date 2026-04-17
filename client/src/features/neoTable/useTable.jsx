/**
 * Contains hooks and logic for the NeoTable component.
 */

import { useState, useEffect } from 'react'
import { filterNeos, getTotalNeoCount } from './api.js'

function useTable() {
  const [neos, setNeos] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalRows, setTotalRows] = useState(null)

  useEffect(() => {
    async function fetchCount() {
      const count = await getTotalNeoCount()
      setTotalRows(count)
    }
    fetchCount()
  }, [])

  useEffect(() => {
    async function fetchNeos() {
      const limit = rowsPerPage
      const offset = rowsPerPage * page
      const data = await filterNeos(limit, offset)
      setNeos(data)
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
/**
 * Custom hook containing logic for the NeoTable component.
 */

import { NeoMainData, TableProps } from './types'
import { useState, useEffect } from 'react'
import { filterNeos, getTotalNeoCount } from './api'
import { useAppContext } from '../../hooks/context'

/**
 * Fetches data to be displayed on the table and handles pagination.
 * Lets the user select 20, 50, or 1000 rows per page.
 */
function useTable(): TableProps {
  const { setError } = useAppContext()

  const [neos, setNeos] = useState<NeoMainData[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(20)
  const [totalRows, setTotalRows] = useState<number>(0)

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

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
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
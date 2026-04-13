/**
 * Table displaying Near-Earth Objects and their attributes.
 */

import { TableContainer, Table, TableHead, TableBody, TableFooter, 
  TableRow, TablePagination, TableCell, Paper } from '@mui/material'
import { filterNeos } from '../api/neos.js'
import { useEffect, useState } from 'react'

function NeoTable() {
  const [neos, setNeos] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalRows, setTotalRows] = useState(16000) // Fix later

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

  const tableHeadStyles = {
    fontFamily: 'GoogleSans',
    fontWeight: 'bolder'
  }
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeadStyles}>Identifier</TableCell>
            <TableCell style={tableHeadStyles}>Name</TableCell>
            <TableCell style={tableHeadStyles}>Earth MOID</TableCell>
            <TableCell style={tableHeadStyles}>Magnitude</TableCell>
            <TableCell style={tableHeadStyles}>Rotation</TableCell>
            <TableCell style={tableHeadStyles}>PHA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {neos.map((neo) => (
            <TableRow
              key={neo.spkid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>{neo.spkid}</TableCell>
              <TableCell>{neo.name}</TableCell>
              <TableCell>{neo.earth_moid_ld}</TableCell>
              <TableCell>{neo.magnitude || 'N/A'}</TableCell>
              <TableCell>{neo.rotation_hours || 'N/A'}</TableCell>
              <TableCell>{(neo.pot_hazardous_asteroid).toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination 
              rowsPerPageOptions={[20, 50, { label: 'All', value: -1 }]}
              rowsPerPage={rowsPerPage}
              count={totalRows}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default NeoTable
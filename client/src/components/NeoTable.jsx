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
  const totalRows = 16000

  useEffect(() => {
    async function fetchNeos() {
      const data = await filterNeos()
      setNeos(data)
    }
    fetchNeos()
  }, [])

  const handleChangePage = () => {
    setPage(prevPage => prevPage + 1)
    console.log('Page: ', page)
  }

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value)
    console.log('Rows: ', rowsPerPage)
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
              <TableCell>{neo.magnitude}</TableCell>
              <TableCell>{neo.rotation_hours}</TableCell>
              <TableCell>{neo.pot_hazardous_asteroid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination 
              rowsPerPageOptions={[20, 50]}
              rowsPerPage={rowsPerPage}
              count={totalRows / rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={(e) => handleChangeRowsPerPage(e.target.value)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default NeoTable
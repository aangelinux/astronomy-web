/**
 * Table displaying Near-Earth Objects and their attributes.
 */

import { TableContainer, Table, TableHead, TableBody, 
  TableRow, TablePagination, TableCell, Paper } from '@mui/material'
import { filterNeos } from '../api/neos.js'
import { useEffect, useState } from 'react'

function NeoTable() {
  const [neos, setNeos] = useState([])

  const tableHead = {
    fontFamily: 'GoogleSans',
    fontWeight: 'bolder'
  }

  useEffect(() => {
    async function fetchNeos() {
      const data = await filterNeos()
      setNeos(data)
    }
    fetchNeos()
  }, [])
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={tableHead}>Identifier</TableCell>
            <TableCell style={tableHead}>Name</TableCell>
            <TableCell style={tableHead}>Earth MOID</TableCell>
            <TableCell style={tableHead}>Magnitude</TableCell>
            <TableCell style={tableHead}>Rotation</TableCell>
            <TableCell style={tableHead}>PHA</TableCell>
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
      </Table>
    </TableContainer>
  )
}

export default NeoTable
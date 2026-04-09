/**
 * Table displaying Near-Earth Objects and their attributes.
 */

import { TableContainer, Table, TableHead, TableBody, 
  TableRow, TablePagination, TableCell, Paper } from '@mui/material'
import { filterNeos } from '../api/neos.js'
import { useEffect, useState } from 'react'

function NeoTable() {
  const [neos, setNeos] = useState([])

  useEffect(() => {
    if (!neos) return

    async function fetchNeos() {
      const data = await filterNeos()
      setNeos(data)
    }
    fetchNeos()
    console.log(neos)
  }, [])
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Identifier</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Earth MOID</TableCell>
            <TableCell align='right'>Magnitude</TableCell>
            <TableCell align='right'>Rotation</TableCell>
            <TableCell align='right'>PHA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {neos.forEach((neo) => (
            <TableRow
              key={neo.spkid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>{neo.spkid}</TableCell>
              <TableCell align='right'>{neo.name}</TableCell>
              <TableCell align='right'>{neo.earth_moid_ld}</TableCell>
              <TableCell align='right'>{neo.magnitude}</TableCell>
              <TableCell align='right'>{neo.rotation_hours}</TableCell>
              <TableCell align='right'>{neo.pot_hazardous_asteroid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default NeoTable
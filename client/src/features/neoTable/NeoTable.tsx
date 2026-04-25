/**
 * Renders a table displaying all Near-Earth Objects.
 */

import Pagination from './Pagination'
import useTable from './useTable'
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper 
} from '@mui/material'

function NeoTable() {
  const { 
    neos, 
    page, 
    rowsPerPage, 
    totalRows, 
    handleChangePage, 
    handleChangeRowsPerPage 
  } = useTable()

  const tableHeadStyle = {
    '& .MuiTableCell-root': {
      fontFamily: 'GoogleSans',
      fontWeight: 'bolder'
    }
  }

  const tableBodyStyle = {
    '& .MuiTableCell-root': {
      fontFamily: 'GoogleSans',
    },
    '& .MuiTableRow-root': {
      '&:last-child td, &:last-child th': { 
        border: 0 
      }
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={tableHeadStyle}>
          <TableRow>
            <TableCell>Identifier</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Earth MOID</TableCell>
            <TableCell>Magnitude</TableCell>
            <TableCell>Rotation</TableCell>
            <TableCell>PHA</TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={tableBodyStyle}>
          {neos.map((neo, index) => (
            <TableRow key={index}>
              <TableCell>{neo.spkid}</TableCell>
              <TableCell>{neo.name}</TableCell>
              <TableCell>{neo.earth_moid_ld}</TableCell>
              <TableCell>{neo.magnitude || 'N/A'}</TableCell>
              <TableCell>{neo.rotation_hours || 'N/A'}</TableCell>
              <TableCell>{(neo.pot_hazardous_asteroid).toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <Pagination 
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  )
}

export default NeoTable
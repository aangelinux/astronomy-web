/**
 * Renders pagination controls for a table.
 */

import { TableFooter, TableRow, TablePagination } from '@mui/material'

function Pagination(props) {
  const { 
    page,
    rowsPerPage,
    totalRows,
    handleChangePage,
    handleChangeRowsPerPage
  } = props

  return (
    <TableFooter>
      <TableRow>
        <TablePagination 
          rowsPerPageOptions={[20, 50]}
          rowsPerPage={rowsPerPage}
          count={totalRows}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
          showLastButton={true}
          showFirstButton={true}
        />
      </TableRow>
    </TableFooter>
  )
}

export default Pagination
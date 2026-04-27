export type NeoMainData = {
  spkid: string
  name: string
  earth_moid_ld: number
  magnitude: number | null
  rotation_hours: number | null
  pot_hazardous_asteroid: boolean
}

export type TableProps = {
  neos: NeoMainData[]
  page: number
  rowsPerPage: number
  totalRows: number
  handleChangePage: (event: any, newPage: number) => void
  handleChangeRowsPerPage: (event: any) => void
}

export type PaginationProps = {
  page: number
  rowsPerPage: number
  totalRows: number
  handleChangePage: (event: any, newPage: number) => void
  handleChangeRowsPerPage: (event: any) => void
}
/**
 * Renders an alert inside a snackbar for server-side errors.
 */

import { useAppContext } from '../../hooks/context'
import { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

function ErrorAlert() {
  const { error, setError } = useAppContext()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!error)
      return

    setOpen(true)
  }, [error])

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway')
      return

    setOpen(false)
    setError(null)
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={() => { setOpen(false), setError(null) }}
        severity='error'
        variant='filled'
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}

export default ErrorAlert
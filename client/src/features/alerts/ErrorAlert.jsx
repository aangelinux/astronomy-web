/**
 * Renders an alert for server-state errors.
 */

import { useAppContext } from '../../context'
import { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

function ErrorAlert() {
  const { error, setError } = useAppContext()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!error)
      return

    setOpen(true)
  }, [error])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return

    setOpen(false)
    setError(null)
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
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
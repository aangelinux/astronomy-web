/**
 * Renders an alert if search-bar input is missing or malformed.
 */

import { AlertProps } from './types'
import { useEffect, useState } from 'react'
import { Alert, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function InputAlert({ alert }: AlertProps) {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!alert)
      return

    setOpen(true)
  }, [alert])

  return (
    open
      ? <Alert
        sx={{ width: 'fit-content', height: 'fit-content' }}
        severity='warning'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }>
          Invalid input
        </Alert>
      : null
  )
}

export default InputAlert
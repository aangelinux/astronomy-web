/**
 * Renders a set of controls for interacting with the timeline.
 * 
 * @typedef { import('react').ReactElement } ReactElement
 * 
 * @typedef {Object} controlsProps
 * @property {function} handlePrev
 * @property {function} handleNext
 * @property {function} handleSubmit
 * @property {function} setInput
 * @property {boolean} alert
 */

import { Button, TextField, Typography } from '@mui/material'
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'
import InputAlert from '../alerts/InputAlert.jsx'

/**
 * React element rendering pagination buttons and a search bar.
 * 
 * @param {controlsProps} props
 * @returns {ReactElement}
 */
function TimelineControls({ handlePrev, handleNext, handleSubmit, setInput, alert }) {
  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  }

  const textFieldStyle = {
    input: {
      color: 'white',
      fontFamily: 'GoogleSans'
    },
    label: {
      color: 'white',
      fontFamily: 'GoogleSans',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
    },
  }

  return (
    <div style={wrapperStyle}>

      <Button variant='outlined' onClick={handlePrev}>
        <ArrowLeft />
        Prev
      </Button>

      <Button variant='outlined' onClick={handleNext}>
        Next
        <ArrowRight />
      </Button>

      <TextField
        label='Select Year ...'
        color='secondary'
        size='small'
        sx={textFieldStyle}
        onChange={(e) => setInput(e.target.value)}
      />

      <InputAlert
        alert={alert}
      />

      <Button variant='outlined' onClick={handleSubmit}>
        Select Year
      </Button>

    </div>
  )
}

export default TimelineControls
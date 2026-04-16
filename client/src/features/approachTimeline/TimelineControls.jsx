/**
 * Renders a set of controls for interacting with the timeline.
 */

import { Button, TextField, Typography } from '@mui/material'
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'

function TimelineControls({ onPrev, onNext, onSubmit, setInput }) {
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

      <Button variant="outlined" onClick={onPrev}>
        <ArrowLeft />
          Prev
      </Button>

      <Button variant="outlined" onClick={onNext}>
          Next
        <ArrowRight />
      </Button>

      <TextField 
        label="Select Year ..."
        color="secondary"
        size="small"
        sx={textFieldStyle}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button variant="outlined" onClick={onSubmit}>
        Select Year
      </Button>

    </div>
  )
}

export default TimelineControls
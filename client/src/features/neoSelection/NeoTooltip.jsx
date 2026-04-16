/**
 * Renders a tooltip explaining Near-Earth Objects.
 */

import Fade from '@mui/material/Fade'
import HelpIcon from '@mui/icons-material/Help'
import { Tooltip, Button } from '@mui/material'

function NeoTooltip() {
  const tooltipSlotProps = {
    transition: { timeout: 400 },
    tooltip: {
      sx: {
        fontSize: '.8rem',
        padding: 1,
        lineHeight: 1.25,
        whiteSpace: 'pre-line'
      }
    }
  }

  const buttonStyle = {
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'GoogleSans',
  }

  const explanation = `A Near-Earth Object (NEO) is a comet or asteroid 
    that orbits the Sun, passing close enough 
    to Earth to pose a potential collision danger.\n
    See page NEOs in the navigation bar for a table 
    listing all Near-Earth Objects in the database.`

  return (
    <Tooltip 
      describeChild 
      title={explanation}
      slots={{ transition: Fade }}
      slotProps={tooltipSlotProps}>

      <Button sx={buttonStyle}>
        What are NEOs 
        <HelpIcon sx={{ marginLeft: .75 }} /> 
      </Button>

    </Tooltip>
  )
}

export default NeoTooltip
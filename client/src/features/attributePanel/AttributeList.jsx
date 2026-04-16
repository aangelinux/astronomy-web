/**
 * Renders a list of attributes.
 */

import Fade from '@mui/material/Fade'
import { List, ListItem, Button, Tooltip } from '@mui/material'

function AttributeList({ attributes }) {
  const getName = (attribute) => {
    return `${Object.keys(attribute)[0]}: `
  }

  const getValue = (attribute) => {
    return JSON.stringify(Object.values(attribute)[0])?.replaceAll('"', '')
  }

  const tooltipSlotProps = {
    transition: { timeout: 400 },
    tooltip: {
      sx: {
        fontSize: '.8rem',
        padding: 1,
        lineHeight: 1.25
      }
    }
  }

  const tooltipStyle = {
    fontSize: '.9rem',
    fontFamily: 'GoogleSans',
    padding: .35,
  }

  return (
    <List>
      {attributes.map((attribute, index) => ( 
        <ListItem key={index} sx={{ gap: 1, fontWeight: 'bold' }}>

          {<Tooltip 
            describeChild 
            title={attribute['explanation']} 
            slots={{ transition: Fade }}
            slotProps={tooltipSlotProps}
            sx={tooltipStyle}>
            <Button>
              {getName(attribute)}
            </Button>
          </Tooltip>}

          {getValue(attribute)}

        </ListItem>
      ))}
    </List>
  )
}

export default AttributeList
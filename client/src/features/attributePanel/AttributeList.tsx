/**
 * Renders a list of NEO attributes.
 */

import { AttributePanelProps } from './types'
import { List, ListItem, Button, Tooltip } from '@mui/material'
import Fade from '@mui/material/Fade'
import HelpIcon from '@mui/icons-material/Help'

function AttributeList({ attributes }: AttributePanelProps) {
  const getName = (attribute: string) => {
    return `${Object.keys(attribute)[0]}: `
  }

  const getValue = (attribute: any) => {
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
      {attributes.map((attribute: any, index: number) => ( 
        <ListItem key={index} sx={{ gap: 1, fontWeight: 'bold', padding: 1 }}>

          {<Tooltip 
            describeChild 
            title={attribute['explanation']} 
            slots={{ transition: Fade }}
            slotProps={tooltipSlotProps}
            sx={tooltipStyle}>
            <Button>
              <HelpIcon sx={{ marginRight: .75 }} /> 
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
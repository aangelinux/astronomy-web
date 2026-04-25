/**
 * Renders a panel displaying attributes of the selected NEO.
 */

import { NeoAttributes } from './types.js'
import { Box, Card, CardContent, Typography } from '@mui/material'
import AttributeList from './AttributeList.js'
import useAttributes from './useAttributes.jsx'

function AttributePanel() {
  const attributes: NeoAttributes[] = useAttributes()

  const boxStyle = {
    width: '100%',
    height: 'fit-content',
    boxShadow: 1,
    fontFamily: 'GoogleSans',
    fontSize: '.95rem',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: .8,
    listStyleType: 'none',
  }

  const headerStyle = {
    fontFamily: 'GoogleSans',
    fontWeight: 'bold',
    paddingTop: 1,
    border: 'none'
  }

  return (
    <Box sx={boxStyle}>
      <Card variant='outlined'>
        <CardContent sx={{ padding: 2 }}>

          <Typography variant='h6' sx={headerStyle}>
            Attributes
          </Typography>

          <AttributeList attributes={attributes} />

        </CardContent>
      </Card>
    </Box>
  )
}

export default AttributePanel
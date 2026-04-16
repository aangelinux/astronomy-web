/**
 * Renders a panel displaying attributes of the selected NEO.
 */

import { Box, Card, CardContent, Typography } from '@mui/material'
import AttributeList from './AttributeList.jsx'

function AttributePanel() {
  const boxStyle = {
    boxShadow: 1,
    fontFamily: 'GoogleSans',
    fontSize: '.95rem',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: .8,
    listStyleType: 'none'
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
        <CardContent sx={{ minHeight: 225, width: 500 }}>

          <Typography variant='h6' sx={headerStyle}>
            Attributes
          </Typography>

          <AttributeList />

        </CardContent>
      </Card>
    </Box>
  )
}

export default AttributePanel
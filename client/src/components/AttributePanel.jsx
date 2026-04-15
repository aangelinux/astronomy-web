/**
 * Panel displaying NEO attributes.
 */

import Fade from '@mui/material/Fade'
import { Box, Button, Card, CardContent, List, ListItem, Tooltip, Typography } from '@mui/material'
import { useAppContext } from '../context.jsx'
import { useState, useEffect } from 'react'

function AttributePanel() {
  const { neoData } = useAppContext()
  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    setAttributes(neoData)
  }, [neoData])

  const mapAttributes = () => {
    const map = [
      { 'SPKID': attributes['spkid'], 
        explanation: 'A unique identfier for Near-Earth Objects' 
      },
      { 'Name': attributes['name'], 
        explanation: 'The name of the Near-Earth object' 
      },
      { 'Earth MOID': attributes['earth_moid_ld'], 
        explanation: `Minimum Orbit Intersection Distance; the closest possible distance 
        between the NEO's orbit and the Earth's orbit, measured in lunar distance units` 
      },
      { 'Magnitude': attributes['magnitude'], 
        explanation: 'Absolute magnitude; a smaller value indicates a larger object'  
      },
      { 'Rotation (hours)': attributes['rotation_hours'], 
        explanation: `The number of hours it takes for the NEO to complete a full 
        rotation around its own axis` 
      },
      { 'PHA': attributes['pot_hazardous_asteroid'], 
        explanation: `A true-or-false flag, classifying the object as a 
        Potentially Hazardous Asteroid` 
      }
    ]
    const filteredMap = map.filter((entry) =>
      (Object.values(entry)[0] !== null || undefined))

    return filteredMap
  }

  const card = (
    <CardContent sx={{ minHeight: 225, width: 500 }}>
      <Typography variant='h6' sx={{
        fontFamily: 'GoogleSans',
        fontWeight: 'bold',
        paddingTop: 1,
        border: 'none'
      }}>
        Attributes
      </Typography>
      <List>
        {mapAttributes().map((attribute, index) => (
          <ListItem key={index} sx={{ gap: 1, fontWeight: 'bold' }}>
            {
            <Tooltip 
              describeChild 
              title={attribute['explanation']} 
              slots={{
                transition: Fade,
              }}
              slotProps={{
                transition: { timeout: 400 },
                tooltip: {
                  sx: {
                    fontSize: '.8rem',
                    padding: 1,
                    lineHeight: 1.25
                  }
                }
              }}
              sx={{
                fontSize: '1rem',
                fontFamily: 'GoogleSans',
                padding: .5,
              }}>
              <Button>
                {Object.keys(attribute)[0]}:
              </Button>
            </Tooltip>
            }
              {JSON.stringify((Object.values(attribute)[0]))?.replaceAll('"', '')}
          </ListItem>
        ))}
      </List>
    </CardContent>
  )

  return (
    <Box sx={{
      boxShadow: 1,
      fontFamily: 'GoogleSans',
      fontSize: '.95rem',
      textAlign: 'center',
      letterSpacing: 1,
      lineHeight: .8,
      listStyleType: 'none'
    }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}

export default AttributePanel
/**
 * Contains hooks and logic for the AttributePanel component.
 */

import { useAppContext } from '../../context.jsx'
import { useState, useEffect } from 'react'

function useAttributes() {
  const { neoData } = useAppContext()
  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    const mappedAttributes = mapAttributes(neoData)
    setAttributes(mappedAttributes)
  }, [neoData])

  const mapAttributes = (data) => {
    const map = [
      { 
        'SPK-ID': data['spkid'], 
        explanation: 'A unique identfier for Near-Earth Objects' 
      },
      { 
        Name: data['name'], 
        explanation: 'The name of the Near-Earth object' 
      },
      { 
        'Earth MOID': data['earth_moid_ld'], 
        explanation: `The closest possible distance between the NEO's orbit and Earth's orbit` 
      },
      { 
        Magnitude: data['magnitude'], 
        explanation: 'Absolute magnitude; a smaller value indicates a larger object'  
      },
      { 
        'Rotation (hours)': data['rotation_hours'], 
        explanation: `The number of hours it takes for the NEO to complete a full 
        rotation around its own axis` 
      },
      { 
        'Potentially Hazardous Asteroid (PHA)': data['pot_hazardous_asteroid'], 
        explanation: `An asteroid with a MOID of less than 0.05 AU` 
      }
    ]

    return map.filter((attribute) => 
      (Object.values(attribute)[0] !== null))
  }

  return attributes
}

export default useAttributes
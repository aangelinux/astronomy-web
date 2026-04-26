/**
 * Custom hook containing logic for the AttributePanel component.
 */

import { NeoAttributes } from './types'
import { useAppContext } from '../../context'
import { useState, useEffect } from 'react'

function useAttributes() {
  const { neoData } = useAppContext()
  const [attributes, setAttributes] = useState<NeoAttributes[]>([])

  useEffect(() => {
    if (!neoData)
      return

    const mappedAttributes = mapAttributes(neoData)
    setAttributes(mappedAttributes)
  }, [neoData])

  const mapAttributes = (data: any) => {
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
        'Earth MOID (LD)': data['earth_moid_ld'], 
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
        'Potentially Hazardous Asteroid': data['pot_hazardous_asteroid'], 
        explanation: `Asteroid that is capable of making threateningly close approaches
        to Earth; determined by MOID (<19.5 LD) and Magnitude (<22)` 
      }
    ]

    return map.filter((attribute) => 
      (Object.values(attribute)[0] !== null))
  }

  return attributes
}

export default useAttributes
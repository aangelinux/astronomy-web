/**
 * Custom hook containing logic for the AttributePanel component.
 */

import { NeoAttributes } from './types'
import { useAppContext } from '../../hooks/context'
import { useState, useEffect } from 'react'
import { NeoData } from '../descriptionPanel/types'

/**
 * Formats attribute data, filters out null values, and adds
 * explanations to be displayed on tooltips.
 */
function useAttributes() {
  const { neoData } = useAppContext()
  const [attributes, setAttributes] = useState<NeoAttributes[]>([])

  useEffect(() => {
    if (!neoData)
      return

    const mappedAttributes = mapAttributes(neoData)
    setAttributes(mappedAttributes)
  }, [neoData])

  const mapAttributes = (data: NeoData): NeoAttributes[] => {
    const map = [
      {
        label: 'SPK-ID',
        value: data['spkid'],
        explanation: 'A unique identfier for Near-Earth Objects'
      },
      {
        label: 'Name', 
        value: data['name'],
        explanation: 'The name of the Near-Earth object'
      },
      {
        label: 'Earth MOID (LD)',
        value: data['earth_moid_ld'],
        explanation: `The closest possible distance between the NEO's orbit and Earth's orbit`
      },
      {
        label: 'Magnitude',
        value: data['magnitude'],
        explanation: 'Absolute magnitude; a smaller value indicates a larger object'
      },
      {
        label: 'Rotation (hours)',
        value: data['rotation_hours'],
        explanation: `The number of hours it takes for the NEO to complete a full 
        rotation around its own axis`
      },
      {
        label: 'Potentially Hazardous Asteroid',
        value: data['pot_hazardous_asteroid'],
        explanation: `Asteroid that is capable of making threateningly close approaches
        to Earth; determined by MOID (<19.5 LD) and Magnitude (<22)`
      }
    ]

    return map.filter((object): object is NeoAttributes => 
      object.value !== null)
  }

  return attributes
}

export default useAttributes
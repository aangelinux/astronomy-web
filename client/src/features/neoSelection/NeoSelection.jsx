/**
 * Renders a set of controls for selecting a Near-Earth Object.
 */

import NeoTooltip from './NeoTooltip'
import SearchBar from './SearchBar'

function NeoSelection() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      gap: 20, 
      alignItems: 'center' 
    }}>
      <NeoTooltip />
      <SearchBar />
    </div>
  )
}

export default NeoSelection
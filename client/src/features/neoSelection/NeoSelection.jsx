/**
 * Renders a set of controls for selecting a Near-Earth Object.
 */

import NeoTooltip from './NeoTooltip'
import SearchBar from './SearchBar'
import useSelection from './useSelection.jsx'

function NeoSelection() {
  const { setNeo, fetchOptions, options, handleClick } = useSelection()

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      gap: 20, 
      alignItems: 'center' 
    }}>
      <NeoTooltip />
      <SearchBar
        setNeo={setNeo}
        fetchOptions={fetchOptions}
        options={options}
        handleClick={handleClick}
      />
    </div>
  )
}

export default NeoSelection
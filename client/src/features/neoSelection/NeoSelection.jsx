/**
 * Renders a set of controls for selecting a Near-Earth Object.
 */

import NeoTooltip from './NeoTooltip'
import SearchBar from './SearchBar'
import useSelection from './useSelection.jsx'

function NeoSelection() {
  const { setNeo, setInput, options, handleClick } = useSelection()

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
        setInput={setInput}
        options={options}
        handleClick={handleClick}
      />
    </div>
  )
}

export default NeoSelection
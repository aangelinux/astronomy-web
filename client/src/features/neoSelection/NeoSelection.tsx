/**
 * Renders a set of controls for selecting a Near-Earth Object.
 */

import NeoTooltip from './NeoTooltip'
import SearchBar from './SearchBar'
import useSelection from './useSelection'

function NeoSelection() {
  const { setInput, options, setNeo, handleClick, alert } = useSelection()

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      gap: 20, 
      alignItems: 'center' 
    }}>
      <NeoTooltip />
      <SearchBar
        setInput={setInput}
        options={options}
        setNeo={setNeo}
        handleClick={handleClick}
        alert={alert}
      />
    </div>
  )
}

export default NeoSelection
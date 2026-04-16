/**
 * Renders a search bar for selecting NEOs.
 */

import { Autocomplete, TextField, Button } from '@mui/material'
import useSelection from './useSelection.jsx'

function SearchBar() {
  const { setNeo, fetchOptions, options, handleClick } = useSelection()

  const wrapperStyle = {
    display: 'flex', 
    flexDirection: 'row', 
    gap: 20,
  }

  const textFieldStyle = {
    input: { 
      color: 'white',
      fontFamily: 'GoogleSans'
    },
    label: { 
      color: 'white',
      fontFamily: 'GoogleSans',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
    },
  }
  
  return (
    <div style={wrapperStyle}>
      <Autocomplete
        disablePortal
        onChange={(event, value) => setNeo(value)}
        onInputChange={(e) => fetchOptions(e.target.value)}
        filterOptions={(x) => x}
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) =>
          <TextField {...params}
            label='Search NEOs ...'
            color='secondary' 
            sx={textFieldStyle} 
          />
        }
      />

      <Button 
        variant='outlined' 
        onClick={handleClick} 
        sx={{ maxHeight: 40, alignSelf: 'center' }}
      >
        Select NEO
      </Button>
    </div>
  )
}

export default SearchBar
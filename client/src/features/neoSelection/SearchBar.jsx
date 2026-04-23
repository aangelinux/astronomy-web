/**
 * Renders a search bar for selecting NEOs.
 * 
 * @typedef { import('react').ReactElement } ReactElement
 */

import { Autocomplete, TextField, Button } from '@mui/material'
import InputAlert from '../alerts/InputAlert.jsx'

/**
 * React element rendering a search bar with autocomplete for NeoSelection.
 * 
 * @param {{
 *  setInput: function,
 *  options: array[{ name: string, spkid: string }],
 *  setNeo: function,
 *  handleClick: function,
 *  alert: boolean
 * }} props
 * 
 * @returns {ReactElement}
 */
function SearchBar({ setInput, options, setNeo, handleClick, alert }) {
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
        color: 'white',
        fontFamily: 'GoogleSans'
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
    }
  }

  const autoCompleteStyle = {
    width: 250,
    '& .MuiAutocomplete-clearIndicator': {
      color: 'white',
    },
    '& .MuiAutocomplete-popupIndicator': {
      color: 'white',
    },
  }
  
  return (
    <div style={wrapperStyle}>
      <Autocomplete
        disablePortal
        onChange={(event, value) => setNeo(value)}
        onInputChange={(event, value) => setInput(value)}
        options={options.filter(option => option.name)}
        getOptionLabel={(option) => option?.name ?? ''}
        sx={autoCompleteStyle}
        renderInput={(params) =>
          <TextField {...params}
            label='Search NEOs ...'
            color='secondary' 
            sx={textFieldStyle} 
          />
        }
      />

      <InputAlert
        alert={alert}
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
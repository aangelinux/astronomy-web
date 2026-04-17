/**
 * Renders a search bar for selecting NEOs.
 */

import { Autocomplete, TextField, Button } from '@mui/material'

function SearchBar({ setNeo, setInput, options, handleClick }) {
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
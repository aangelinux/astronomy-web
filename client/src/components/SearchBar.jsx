/**
 * Search bar component with autocomplete.
 */

import Fade from '@mui/material/Fade'
import HelpIcon from '@mui/icons-material/Help';
import { useAppContext } from '../context.jsx'
import { filterNeosBy, getNeoData, getNeoSpkid } from '../api/neos.js'
import { Autocomplete, Button, TextField, Tooltip } from '@mui/material'
import { useState } from 'react'

function SearchBar() {
  const { setNeoData } = useAppContext()
  const [neo, setNeo] = useState("")
  const [options, setOptions] = useState([])

  const fetchOptions = (query) => {
    if (!query) return
    const timer = setTimeout(async () => {
      const data = await filterNeosBy(query)
      const neos = data.map((neo) => neo.name)
      setOptions(neos)
    }, 500)

    return () => clearTimeout(timer)
  }

  const handleClick = async () => {
    const spkid = await getNeoSpkid(neo)
    const data = await getNeoData(spkid)

    setNeoData(data)
  }

  const textFieldStyle = {
    input: { color: 'white' },
    label: { color: 'white' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'whitesmoke',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
    },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <Tooltip 
          describeChild 
          title="A Near-Earth Object (NEO) is a comet or asteroid that orbits the Sun.
          It passes close enough to Earth to pose a potential collision danger."
          slots={{
            transition: Fade,
          }}
          slotProps={{
            transition: { timeout: 400 },
            tooltip: {
              sx: {
                fontSize: '.8rem',
                padding: 1,
                lineHeight: 1.25
              }
            }
          }}
        >
          <Button sx={{ 
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'GoogleSans',
          }}>
            What are NEOs 
            <HelpIcon sx={{ marginLeft: .75 }}></HelpIcon> 
          </Button>
        </Tooltip>
      </div>

      <div>
        <Autocomplete
          disablePortal
          onChange={(event, value) => setNeo(value)}
          onInputChange={(e) => fetchOptions(e.target.value)}
          filterOptions={(x) => x}
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) =>
            <TextField {...params}
              color="secondary" sx={textFieldStyle} label="Search NEOs ..."
            />
          }
        />
      </div>

      <div style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleClick} sx={{
          maxHeight: 40,
          alignSelf: 'center'
        }}>
          Select NEO
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
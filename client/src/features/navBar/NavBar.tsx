/**
 * Renders a navigation bar for authorized users.
 */

import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Link } from '@mui/material'
import astronomyIcon from '../../../assets/astronomy.png'

function NavBar() {
  const linkStyle = {
    color: 'white',
    fontFamily: 'GoogleSans',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textAlign: 'center',
    margin: 1.7
  }

  return (
    <AppBar sx={{ maxHeight: 50 }}>
      <Toolbar sx={{ backgroundColor: '#0b0f1a', boxShadow: 20 }}>

        <img
          src={astronomyIcon}
          alt="Astronomy Icon"
          style={{ margin: 5, height: 35 }}
        />

        <Link component={RouterLink} to='/' sx={linkStyle}>Dashboard</Link>
        <Link component={RouterLink} to='/neos' sx={linkStyle}>NEOs</Link>

      </Toolbar>
    </AppBar>
  )
}

export default NavBar
/**
 * Renders a navigation bar for authorized users.
 */

import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar, Toolbar, Link, Button } from '@mui/material'
import { logout } from './api.js'

function NavBar() {
  const handleClick = async () => {
    try {
      await logout()
      window.location.href = '/auth'
    } catch (error) {
      console.log(error)
    }
  }

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
          src="/assets/astronomy.png"
          alt="Astronomy Icon"
          style={{ margin: 5, height: 35 }}
        />

        <Link href="/dashboard" sx={linkStyle}>Dashboard</Link>
        <Link href="/neos" sx={linkStyle}>NEOs</Link>

        <Button onClick={handleClick}>
          <LogoutIcon />
        </Button>

      </Toolbar>
    </AppBar>
  )
}

export default NavBar
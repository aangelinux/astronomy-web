/**
 * Navigation bar for authorized users.
 */

import { AppBar, Toolbar, Link, Avatar, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../api/auth.js'

function NavBar() {
  const linkStyle = {
    color: 'white',
    fontFamily: 'GoogleSans',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textAlign: 'center',
    margin: 1.7
  }

  const handleClick = async () => {
    await logout()
  }

  return (
    <AppBar sx={{ maxHeight: 50 }}>
      <Toolbar sx={{ backgroundColor: '#0b0f1a', boxShadow: 10 }}>
        <Avatar
          src="../../assets/astronomy.png"
          alt="Astronomy Icon"
          sx={{ margin: 2.5 }}>
        </Avatar>
        <Link href="/" sx={linkStyle}>Auth</Link>
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
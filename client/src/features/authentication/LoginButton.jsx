/**
 * Renders a button for authorization with GitHub.
 */

import { Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

function LoginButton() {
  const handleClick = () => {
    window.location.href = 'http://localhost:3001/auth/github'
  }

  const buttonStyle = {
    display: 'flex',
    justifySelf: 'center',
    fontFamily: 'GoogleSans',
    fontWeight: 'bolder',
    fontSize: '1rem',
    textAlign: 'center',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 2,
    gap: 1,
    ':hover': {
      transform: 'scale(1.1) perspective(1px)'
    }
  }

  return (
    <Button
      variant='contained'
      size='large'
      onClick={handleClick}
      startIcon={<GitHubIcon />}
      sx={buttonStyle}
    >
      Login with GitHub
    </Button>
  )
}

export default LoginButton
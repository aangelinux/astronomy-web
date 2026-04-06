/**
 * Login with GitHub button.
 */

import { Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';

function LoginButton() {
	const handleClick = () => {
    window.location.href = 'http://localhost:3001/auth/github'
  }

  return (
		<Button 
			variant='contained' 
			size='large' 
			onClick={handleClick} 
			startIcon={<GitHubIcon />} 
			sx={{
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
		}}>
			Login with GitHub
		</Button>
	)
}

export default LoginButton
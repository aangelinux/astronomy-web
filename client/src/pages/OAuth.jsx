/**
 * Authorization page.
 */

function SignIn() {
	function handleClick() {
		window.location.href = 'http://localhost:3001/auth/github'
	}
	
	return (
		<button onClick={handleClick}>
			Login with GitHub
		</button>
	)
}

export default SignIn
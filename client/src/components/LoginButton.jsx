/**
 * Login with GitHub button.
 */

import styles from '../styles/LoginButton.module.css'

function LoginButton() {
	function handleClick() {
    window.location.href = 'http://localhost:3001/auth/github'
  }

  return (
		<button onClick={handleClick} className={styles.githubBtn}>
			Login with GitHub
			<div>
				<img src="../../assets/github.png" alt="GitHub" className={styles.githubLogo} />
			</div>
		</button>
	)
}

export default LoginButton
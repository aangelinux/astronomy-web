/**
 * Page for authorizing users with GitHub OAuth.
 */

import LoginButton from '../components/LoginButton.jsx'
import styles from './styles/Login.module.css'

function Login() {
  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Sign In</h1>
      <LoginButton />
    </div>
  )
}

export default Login

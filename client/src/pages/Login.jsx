/**
 * Page for authorizing users with GitHub OAuth.
 */

import LoginButton from '../components/LoginButton.jsx'
import styles from './styles/Login.module.css'
import { authenticate } from '../api/auth.js'
import { useEffect } from 'react'

function Login() {
  useEffect(() => {
    async function auth() {
      try {
        await authenticate()
        window.location.href = 'http://localhost:3002/dashboard'
      } catch (error) {
        console.log(error)
      }
    }
    auth()
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Sign In</h1>
      <LoginButton />
    </div>
  )
}

export default Login

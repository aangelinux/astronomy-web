/**
 * Login page.
 */

import styles from './styles/Login.module.css'
import LoginButton from '../features/authentication/LoginButton.jsx'
import { authenticate } from '../features/authentication/api.js'
import { useEffect } from 'react'

function Login() {
  useEffect(() => {
    async function checkAuth() {
      try {
        await authenticate()
        window.location.href = '/dashboard'
      } catch (error) {
        console.log(error)
      }
    }
    checkAuth()
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Sign In</h1>
      <LoginButton />
    </div>
  )
}

export default Login

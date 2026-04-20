/**
 * Login page.
 */

import styles from './styles/Login.module.css'
import LoginButton from '../features/authentication/LoginButton.jsx'
import { authenticate } from '../features/authentication/api.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      try {
        await authenticate()
        navigate('/')
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

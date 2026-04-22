/**
 * Login page.
 */

import styles from './styles/Login.module.css'
import LoginButton from '../features/authentication/LoginButton.jsx'
import { authenticate } from '../features/authentication/api.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
      <div className={styles.header}><h2>Sign In</h2></div>
      <div className={styles.button}><LoginButton /></div>
    </div>
  )
}

export default Login

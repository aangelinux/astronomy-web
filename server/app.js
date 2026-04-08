/**
 * Express server for OAuth authorization.
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { xss } from 'express-xss-sanitizer'
import { router } from './router.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cookieParser())
app.use(xss())

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true
}))

app.use('/', router)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Oops! Something went wrong.' })
})

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})

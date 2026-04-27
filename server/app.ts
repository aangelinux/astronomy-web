/**
 * Express server for the Astronomy Dashboard.
 */

import type { Request, Response, NextFunction } from 'express'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { xss } from 'express-xss-sanitizer'
import { router } from './router.ts'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDist = path.join(__dirname, '..', 'client', 'dist')

app.use(express.json())
app.use(cookieParser())
app.use(xss())

app.use(cors({
  origin: process.env.ROOT_URL,
  credentials: true
}))

// Serve client production build when available
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDist))
}

app.use('/', router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  if (res.headersSent)
    return next(err)

  res.status(500).json({ message: 'Oops! Something went wrong.' })
})

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})

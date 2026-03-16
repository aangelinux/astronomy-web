/**
 * Express server for OAuth authorization.
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './router'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use('/', router)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Oops! Something went wrong.' })
})

app.listen(PORT, () => {
	console.log(`Server listening on PORT ${PORT}`)
})
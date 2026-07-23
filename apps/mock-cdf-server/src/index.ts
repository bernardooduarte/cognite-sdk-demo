import express from 'express'
import cors from 'cors'
import { assets, timeseries, events } from './data'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/assets', (_req, res) => {
  res.json({ items: assets })
})

app.get('/timeseries', (_req, res) => {
  res.json({ items: timeseries })
})

app.get('/events', (_req, res) => {
  res.json({ items: events })
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`mock-cdf-server rodando em http://localhost:${PORT}`)
})
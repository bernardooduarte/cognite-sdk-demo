import express, { type Express } from 'express'
import cors from 'cors'
import { getMaterials, getClientsData, getOrders } from './cogniteService'

const app: Express = express()
app.use(cors())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/materials', async (_req, res) => {
  res.json(await getMaterials())
})

app.get('/clients', async (_req, res) => {
  res.json(await getClientsData())
})

app.get('/orders', async (_req, res) => {
  res.json(await getOrders())
})

export default app

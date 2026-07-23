import express from 'express'
import cors from 'cors'
import { getMaterials, getClientsData, getOrders } from './cogniteService'

const app = express()
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

const PORT = 4001
app.listen(PORT, () => {
  console.log(`api-node rodando em http://localhost:${PORT}`)
})
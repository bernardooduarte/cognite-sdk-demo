import type { DataSource, Material, ClientTimeSeries, Order } from './types'

const BASE_URLS: Record<DataSource, string> = {
  python: 'http://localhost:8000',
  javascript: 'http://localhost:4001',
}

async function getJson<T>(source: DataSource, path: string): Promise<T> {
  const res = await fetch(`${BASE_URLS[source]}${path}`)
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar ${path}`)
  return res.json()
}

export const fetchMaterials = (source: DataSource) => getJson<Material[]>(source, '/materials')
export const fetchClients = (source: DataSource) => getJson<ClientTimeSeries[]>(source, '/clients')
export const fetchOrders = (source: DataSource) => getJson<Order[]>(source, '/orders')
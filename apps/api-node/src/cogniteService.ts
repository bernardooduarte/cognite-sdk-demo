import { CogniteClient, ExternalAssetItem, ExternalEvent, ExternalTimeseries } from '@cognite/sdk'

const USE_REAL_CDF = process.env.USE_REAL_CDF === 'true'

function getClient(): CogniteClient {
  return new CogniteClient({
    appId: 'cognite-sdk-demo-node',
    project: process.env.CDF_PROJECT!,
    baseUrl: `https://${process.env.CDF_CLUSTER}.cognitedata.com`,
    getToken: async () => {
      throw new Error('Autenticação real com a Cognite não está implementada nesta demo')
    },
  })
}

export async function getMaterials(): Promise<ExternalAssetItem[]> {
  if (USE_REAL_CDF) {
    const res = await getClient().assets.list({ limit: 5 })
    return res.items
  }
  return [
    { externalId: 'MAT-001', name: 'Steel Pipe 6', description: 'Piping material', metadata: { category: 'Piping', unit: 'meter' } },
    { externalId: 'MAT-002', name: 'Carbon Steel Flange', description: 'Fitting material', metadata: { category: 'Fittings', unit: 'unit' } },
    { externalId: 'MAT-003', name: 'Industrial Valve 4', description: 'Valve material', metadata: { category: 'Valves', unit: 'unit' } },
    { externalId: 'MAT-004', name: 'Insulation Foam', description: 'Insulation material', metadata: { category: 'Insulation', unit: 'kg' } },
    { externalId: 'MAT-005', name: 'Welding Electrode E6013', description: 'Consumable material', metadata: { category: 'Consumables', unit: 'kg' } },
  ]
}

export async function getClientsData(): Promise<ExternalTimeseries[]> {
  if (USE_REAL_CDF) {
    const res = await getClient().timeseries.list({ limit: 5 })
    return res.items
  }
  return [
    { externalId: 'TS-CLI-001', name: 'Norlandia Energy - Activity', unit: 'orders/month', metadata: { industry: 'Oil & Gas', country: 'Norway' } },
    { externalId: 'TS-CLI-002', name: 'Atlas Manufacturing Co. - Activity', unit: 'orders/month', metadata: { industry: 'Manufacturing', country: 'Brazil' } },
    { externalId: 'TS-CLI-003', name: 'Greenfield Power - Activity', unit: 'orders/month', metadata: { industry: 'Energy', country: 'USA' } },
  ]
}

export async function getOrders(): Promise<ExternalEvent[]> {
  if (USE_REAL_CDF) {
    const res = await getClient().events.list({ limit: 5 })
    return res.items
  }
  return [
    { externalId: 'ORD-001', type: 'order', subtype: 'confirmed', description: 'Order for MAT-001', metadata: { clientId: 'CLI-001', materialId: 'MAT-001', quantity: '500' }, startTime: 1748822400000 },
    { externalId: 'ORD-002', type: 'order', subtype: 'pending', description: 'Order for MAT-003', metadata: { clientId: 'CLI-002', materialId: 'MAT-003', quantity: '20' }, startTime: 1750032000000 },
    { externalId: 'ORD-003', type: 'order', subtype: 'shipped', description: 'Order for MAT-004', metadata: { clientId: 'CLI-003', materialId: 'MAT-004', quantity: '1200' }, startTime: 1750464000000 },
  ]
}
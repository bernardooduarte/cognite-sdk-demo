export const assets = [
  { id: 1001, externalId: 'MAT-001', name: 'Steel Pipe 6"', description: 'Piping material', metadata: { category: 'Piping', unit: 'meter' } },
  { id: 1002, externalId: 'MAT-002', name: 'Carbon Steel Flange', description: 'Fitting material', metadata: { category: 'Fittings', unit: 'unit' } },
  { id: 1003, externalId: 'MAT-003', name: 'Industrial Valve 4"', description: 'Valve material', metadata: { category: 'Valves', unit: 'unit' } },
  { id: 1004, externalId: 'MAT-004', name: 'Insulation Foam', description: 'Insulation material', metadata: { category: 'Insulation', unit: 'kg' } },
  { id: 1005, externalId: 'MAT-005', name: 'Welding Electrode E6013', description: 'Consumable material', metadata: { category: 'Consumables', unit: 'kg' } },
]

export const timeseries = [
  { id: 2001, externalId: 'TS-CLI-001', name: 'Norlandia Energy - Activity', unit: 'orders/month', metadata: { industry: 'Oil & Gas', country: 'Norway' } },
  { id: 2002, externalId: 'TS-CLI-002', name: 'Atlas Manufacturing Co. - Activity', unit: 'orders/month', metadata: { industry: 'Manufacturing', country: 'Brazil' } },
  { id: 2003, externalId: 'TS-CLI-003', name: 'Greenfield Power - Activity', unit: 'orders/month', metadata: { industry: 'Energy', country: 'USA' } },
]

export const events = [
  { id: 3001, externalId: 'ORD-001', type: 'order', subtype: 'confirmed', description: 'Order for MAT-001', metadata: { clientId: 'CLI-001', materialId: 'MAT-001', quantity: '500' }, startTime: 1748822400000 },
  { id: 3002, externalId: 'ORD-002', type: 'order', subtype: 'pending', description: 'Order for MAT-003', metadata: { clientId: 'CLI-002', materialId: 'MAT-003', quantity: '20' }, startTime: 1750032000000 },
  { id: 3003, externalId: 'ORD-003', type: 'order', subtype: 'shipped', description: 'Order for MAT-004', metadata: { clientId: 'CLI-003', materialId: 'MAT-004', quantity: '1200' }, startTime: 1750464000000 },
]
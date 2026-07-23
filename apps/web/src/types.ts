export interface Material {
  externalId: string
  name: string
  description?: string
  metadata?: Record<string, string>
}

export interface ClientTimeSeries {
  externalId: string
  name: string
  unit?: string
  metadata?: Record<string, string>
}

export interface Order {
  externalId: string
  type?: string
  subtype?: string
  description?: string
  metadata?: Record<string, string>
  startTime?: number
}

export type DataSource = 'python' | 'javascript'
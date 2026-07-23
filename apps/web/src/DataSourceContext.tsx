import { createContext, useContext, useState, type ReactNode } from 'react'
import type { DataSource } from './types'

interface DataSourceContextValue {
  source: DataSource
  setSource: (s: DataSource) => void
}

const DataSourceContext = createContext<DataSourceContextValue | undefined>(undefined)

export function DataSourceProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<DataSource>('python')
  return (
    <DataSourceContext.Provider value={{ source, setSource }}>
      {children}
    </DataSourceContext.Provider>
  )
}

export function useDataSource() {
  const ctx = useContext(DataSourceContext)
  if (!ctx) throw new Error('useDataSource precisa estar dentro de DataSourceProvider')
  return ctx
}
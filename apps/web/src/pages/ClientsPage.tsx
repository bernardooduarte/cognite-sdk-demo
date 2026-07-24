import { useEffect, useState } from 'react'
import {
  Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Alert,
} from '@mui/material'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutlined'
import { useDataSource } from '../DataSourceContext'
import { fetchClients } from '../api'
import type { ClientTimeSeries } from '../types'
import { PageHeader } from '../components/PageHeader'
import { TableSkeleton } from '../components/TableSkeleton'
import { EmptyState } from '../components/EmptyState'

const COLUMN_COUNT = 4

export function ClientsPage() {
  const { source } = useDataSource()
  const [clients, setClients] = useState<ClientTimeSeries[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchClients(source)
      .then(setClients)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [source])

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
      <PageHeader
        title="Clients"
        subtitle="Clientes cadastrados na Cognite Data Fusion."
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!error && (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableSkeleton columns={COLUMN_COUNT} />
            ) : clients.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={COLUMN_COUNT} sx={{ border: 0 }}>
                    <EmptyState
                      message="Nenhum cliente encontrado"
                      icon={<PeopleOutlineIcon sx={{ fontSize: 48, mb: 1.5, opacity: 0.5 }} />}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {clients.map((c) => (
                  <TableRow key={c.externalId} hover>
                    <TableCell sx={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>{c.externalId}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.metadata?.industry}</TableCell>
                    <TableCell>{c.metadata?.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}

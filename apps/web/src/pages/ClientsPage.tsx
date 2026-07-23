import { useEffect, useState } from 'react'
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert,
} from '@mui/material'
import { useDataSource } from '../DataSourceContext'
import { fetchClients } from '../api'
import type { ClientTimeSeries } from '../types'

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Clients</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
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
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
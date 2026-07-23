import { useEffect, useState } from 'react'
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, Alert,
} from '@mui/material'
import { useDataSource } from '../DataSourceContext'
import { fetchOrders } from '../api'
import type { Order } from '../types'

const statusColor: Record<string, 'default' | 'warning' | 'info' | 'success'> = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'info',
  delivered: 'success',
}

export function OrdersPage() {
  const { source } = useDataSource()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchOrders(source)
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [source])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.externalId} hover>
                  <TableCell sx={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>{o.externalId}</TableCell>
                  <TableCell>{o.metadata?.clientId}</TableCell>
                  <TableCell>{o.metadata?.materialId}</TableCell>
                  <TableCell>{o.metadata?.quantity}</TableCell>
                  <TableCell>{o.subtype && <Chip label={o.subtype} size="small" color={statusColor[o.subtype]} />}</TableCell>
                  <TableCell>{o.startTime && new Date(o.startTime).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
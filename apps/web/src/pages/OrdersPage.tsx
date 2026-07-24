import { useEffect, useState } from 'react'
import {
  Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, Alert,
} from '@mui/material'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import { useDataSource } from '../DataSourceContext'
import { fetchOrders } from '../api'
import type { Order } from '../types'
import { PageHeader } from '../components/PageHeader'
import { TableSkeleton } from '../components/TableSkeleton'
import { EmptyState } from '../components/EmptyState'

const COLUMN_COUNT = 6

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
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
      <PageHeader
        title="Orders"
        subtitle="Pedidos registrados na Cognite Data Fusion."
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
                <TableCell>Client</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableSkeleton columns={COLUMN_COUNT} />
            ) : orders.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={COLUMN_COUNT} sx={{ border: 0 }}>
                    <EmptyState
                      message="Nenhum pedido encontrado"
                      icon={<ReceiptLongOutlinedIcon sx={{ fontSize: 48, mb: 1.5, opacity: 0.5 }} />}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
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
            )}
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}

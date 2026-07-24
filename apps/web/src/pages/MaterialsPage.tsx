import { useEffect, useState } from 'react'
import {
  Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, Alert,
} from '@mui/material'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { useDataSource } from '../DataSourceContext'
import { fetchMaterials } from '../api'
import type { Material } from '../types'
import { PageHeader } from '../components/PageHeader'
import { TableSkeleton } from '../components/TableSkeleton'
import { EmptyState } from '../components/EmptyState'

const COLUMN_COUNT = 5

export function MaterialsPage() {
  const { source } = useDataSource()
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchMaterials(source)
      .then(setMaterials)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [source])

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
      <PageHeader
        title="Materials"
        subtitle="Catálogo de materiais cadastrados na Cognite Data Fusion."
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
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableSkeleton columns={COLUMN_COUNT} />
            ) : materials.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={COLUMN_COUNT} sx={{ border: 0 }}>
                    <EmptyState
                      message="Nenhum material encontrado"
                      icon={<Inventory2OutlinedIcon sx={{ fontSize: 48, mb: 1.5, opacity: 0.5 }} />}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {materials.map((m) => (
                  <TableRow key={m.externalId} hover>
                    <TableCell sx={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>{m.externalId}</TableCell>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.description}</TableCell>
                    <TableCell>{m.metadata?.category && <Chip label={m.metadata.category} size="small" />}</TableCell>
                    <TableCell>{m.metadata?.unit}</TableCell>
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

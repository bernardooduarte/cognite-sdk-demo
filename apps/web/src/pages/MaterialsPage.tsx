import { useEffect, useState } from 'react'
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, Alert,
} from '@mui/material'
import { useDataSource } from '../DataSourceContext'
import { fetchMaterials } from '../api'
import type { Material } from '../types'

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Materials</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper}>
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
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
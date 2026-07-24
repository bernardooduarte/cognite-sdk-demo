import { TableBody, TableCell, TableRow, Skeleton } from '@mui/material'

interface TableSkeletonProps {
  columns: number
  rows?: number
}

export function TableSkeleton({ columns, rows = 6 }: TableSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

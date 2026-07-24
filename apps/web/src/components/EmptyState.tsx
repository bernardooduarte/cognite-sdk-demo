import { Box, Typography } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  message: string
  icon?: ReactNode
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        color: 'text.secondary',
      }}
    >
      {icon ?? <InboxOutlinedIcon sx={{ fontSize: 48, mb: 1.5, opacity: 0.5 }} />}
      <Typography variant="body1">{message}</Typography>
    </Box>
  )
}

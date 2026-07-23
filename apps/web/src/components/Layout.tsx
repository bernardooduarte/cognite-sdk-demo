import { AppBar, Toolbar, Typography, Tabs, Tab, Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useDataSource } from '../DataSourceContext'
import type { DataSource } from '../types'

const routes = [
  { label: 'Materials', path: '/materials' },
  { label: 'Clients', path: '/clients' },
  { label: 'Orders', path: '/orders' },
]

export function Layout() {
  const location = useLocation()
  const { source, setSource } = useDataSource()
  const currentTab = routes.find((r) => r.path === location.pathname)?.path ?? false

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mr: 4 }}>
              Cognite SDK Demo
            </Typography>
            <Tabs value={currentTab} textColor="inherit" indicatorColor="secondary">
              {routes.map((route) => (
                <Tab key={route.path} label={route.label} value={route.path} component={Link} to={route.path} />
              ))}
            </Tabs>
          </Box>
          <ToggleButtonGroup
            value={source}
            exclusive
            size="small"
            color="secondary"
            onChange={(_e, value: DataSource | null) => value && setSource(value)}
            sx={{
              '& .MuiToggleButton-root': {
                color: 'rgba(255, 255, 255, 0.85)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '& .MuiToggleButton-root.Mui-selected': {
                color: 'secondary.contrastText',
                backgroundColor: 'secondary.main',
              },
            }}
          >
            <ToggleButton value="python">Python SDK</ToggleButton>
            <ToggleButton value="javascript">JavaScript SDK</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
}
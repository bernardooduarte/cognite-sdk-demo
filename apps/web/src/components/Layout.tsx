import { useState } from 'react'
import {
  AppBar, Toolbar, Typography, Tabs, Tab, Box, ToggleButton, ToggleButtonGroup,
  IconButton, Drawer, List, ListItemButton, ListItemText, useMediaQuery, type Theme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useDataSource } from '../DataSourceContext'
import type { DataSource } from '../types'

const routes = [
  { label: 'Materials', path: '/materials' },
  { label: 'Clients', path: '/clients' },
  { label: 'Orders', path: '/orders' },
]

const toggleSx = {
  '& .MuiToggleButton-root': {
    color: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  '& .MuiToggleButton-root.Mui-selected': {
    color: 'secondary.contrastText',
    backgroundColor: 'secondary.main',
  },
}

export function Layout() {
  const location = useLocation()
  const { source, setSource } = useDataSource()
  const currentTab = routes.find((r) => r.path === location.pathname)?.path ?? false
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSourceChange = (_e: unknown, value: DataSource | null) => {
    if (value) setSource(value)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 1.5 }}
                aria-label="Abrir menu de navegação"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap sx={{ mr: 4, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Cognite SDK Demo
            </Typography>
            {!isMobile && (
              <Tabs value={currentTab} textColor="inherit" indicatorColor="secondary">
                {routes.map((route) => (
                  <Tab key={route.path} label={route.label} value={route.path} component={Link} to={route.path} />
                ))}
              </Tabs>
            )}
          </Box>
          <ToggleButtonGroup
            value={source}
            exclusive
            size="small"
            color="secondary"
            onChange={handleSourceChange}
            sx={toggleSx}
          >
            <ToggleButton value="python">{isMobile ? 'PY' : 'Python SDK'}</ToggleButton>
            <ToggleButton value="javascript">{isMobile ? 'JS' : 'JavaScript SDK'}</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMobile && drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {routes.map((route) => (
              <ListItemButton
                key={route.path}
                component={Link}
                to={route.path}
                selected={currentTab === route.path}
              >
                <ListItemText primary={route.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </>
  )
}

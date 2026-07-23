import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MaterialsPage } from './pages/MaterialsPage'
import { ClientsPage } from './pages/ClientsPage'
import { OrdersPage } from './pages/OrdersPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/materials" replace />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthStore from './store/authStore'

import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'

import Home from './pages/public/Home'
import Pricing from './pages/public/Pricing'
import Docs from './pages/public/Docs'
import Blog from './pages/public/Blog'
import RiskDisclosure from './pages/public/RiskDisclosure'
import Login from './pages/public/Login'
import Register from './pages/public/Register'

import Overview from './pages/dashboard/Overview'
import APIKeys from './pages/dashboard/APIKeys'
import Usage from './pages/dashboard/Usage'
import Billing from './pages/dashboard/Billing'
import Playground from './pages/dashboard/Playground'
import Settings from './pages/dashboard/Settings'

function PrivateRoute({ children }) {
  const token = useAuthStore((s) => s.token)
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  const { token, fetchMe } = useAuthStore()

  useEffect(() => {
    if (token) fetchMe()
  }, [token])

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/risk-disclosure" element={<RiskDisclosure />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="api-keys" element={<APIKeys />} />
        <Route path="usage" element={<Usage />} />
        <Route path="billing" element={<Billing />} />
        <Route path="playground" element={<Playground />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

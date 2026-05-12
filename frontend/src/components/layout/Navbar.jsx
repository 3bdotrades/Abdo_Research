import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Brain, Menu, X } from 'lucide-react'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const links = [
    { to: '/pricing', label: 'Pricing' },
    { to: '/docs', label: 'Docs' },
    { to: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Brain size={18} className="text-white" />
            </div>
            <span>Abdo Research</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-secondary text-sm py-2">Dashboard</Link>
                <button onClick={() => { logout(); navigate('/') }} className="text-gray-400 hover:text-white text-sm transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Sign in</Link>
                <Link to="/register" className="btn-primary text-sm py-2">Get started free</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 text-sm font-medium">
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-primary text-sm">Dashboard</Link>
                <button onClick={() => { logout(); navigate('/'); setOpen(false) }} className="btn-secondary text-sm">Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary text-sm">Sign in</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-sm">Get started free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

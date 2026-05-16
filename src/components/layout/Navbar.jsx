import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const links = [
    { to: '/fund',     label: 'الأداء' },
    { to: '/signals',  label: 'الإشارات' },
    { to: '/research', label: 'البحوث' },
    { to: '/pricing',  label: 'الأسعار' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-900/40 shrink-0">
              <span style={{ direction: 'ltr', fontFamily: 'Inter, sans-serif' }} className="text-gray-950 font-black text-xs">AR</span>
            </div>
            <span>أبدو ريسيرش</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-secondary text-sm py-2">لوحة التحكم</Link>
                <button onClick={() => { logout(); navigate('/') }} className="text-gray-400 hover:text-white text-sm transition-colors">خروج</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">تسجيل الدخول</Link>
                <Link to="/register" className="btn-primary text-sm py-2">ابدأ مجاناً</Link>
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
              className="block px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 text-sm font-semibold">
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-primary text-sm">لوحة التحكم</Link>
                <button onClick={() => { logout(); navigate('/'); setOpen(false) }} className="btn-secondary text-sm">خروج</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary text-sm">تسجيل الدخول</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-sm">ابدأ مجاناً</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

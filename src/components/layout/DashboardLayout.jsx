import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, BarChart3, Zap, CreditCard, Settings, LogOut } from 'lucide-react'
import useAuthStore from '../../store/authStore'

const NAV = [
  { to: '/dashboard',                  icon: LayoutDashboard, label: 'نظرة عامة', end: true },
  { to: '/dashboard/portfolios',       icon: BarChart3,        label: 'المحفظة' },
  { to: '/dashboard/recommendations',  icon: Zap,              label: 'الإشارات' },
  { to: '/dashboard/billing',          icon: CreditCard,       label: 'الفواتير' },
  { to: '/dashboard/settings',         icon: Settings,         label: 'الإعدادات' },
]

const PLAN_BADGE = {
  free: 'badge-free',
  pro: 'badge-pro',
  enterprise: 'badge-enterprise',
}

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    /* Keep dashboard LTR — financial data is universally LTR */
    <div className="flex min-h-screen" dir="ltr">
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2 font-bold text-white">
            <div className="w-7 h-7 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-gray-950 font-black text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>AR</span>
            </div>
            Abdo Research
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-950/60 text-brand-300 border border-brand-900/40'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
            <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user?.full_name || 'User'}</div>
              <span className={PLAN_BADGE[user?.plan || 'free']}>{user?.plan || 'free'}</span>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/') }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-gray-800/60 transition-colors">
            <LogOut size={16} /> خروج
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-950 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

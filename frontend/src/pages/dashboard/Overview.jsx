import { useQuery } from '@tanstack/react-query'
import { Zap, Key, TrendingUp, ArrowUpRight, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import useAuthStore from '../../store/authStore'

function StatCard({ icon: Icon, label, value, sub, color = 'brand' }) {
  const colors = { brand: 'text-brand-400 bg-brand-900/40', green: 'text-green-400 bg-green-900/40', yellow: 'text-yellow-400 bg-yellow-900/40' }
  return (
    <div className="card flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
        {sub && <div className="text-xs text-gray-600 mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

export default function Overview() {
  const user = useAuthStore((s) => s.user)
  const { data: stats } = useQuery({ queryKey: ['usage-stats'], queryFn: () => api.get('/usage/stats').then(r => r.data) })
  const { data: keys } = useQuery({ queryKey: ['api-keys'], queryFn: () => api.get('/api-keys').then(r => r.data) })

  const usagePct = stats ? Math.round((stats.calls_this_month / stats.monthly_limit) * 100) : 0

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="text-gray-500 text-sm">Here's your API usage overview for this month.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={Zap} label="API calls this month" value={stats?.calls_this_month ?? '—'} sub={`of ${stats?.monthly_limit?.toLocaleString()} limit`} />
        <StatCard icon={Key} label="Active API keys" value={keys?.length ?? '—'} color="green" />
        <StatCard icon={TrendingUp} label="Total API calls" value={stats?.total_calls ?? '—'} color="yellow" />
      </div>

      {/* Quota bar */}
      {stats && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Monthly quota usage</span>
            <span className="text-sm text-gray-400">{usagePct}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-3">
            <div
              className={`h-2.5 rounded-full transition-all ${usagePct > 90 ? 'bg-red-500' : usagePct > 70 ? 'bg-yellow-500' : 'bg-brand-500'}`}
              style={{ width: `${Math.min(usagePct, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{stats.calls_this_month} used</span>
            <span>{stats.remaining_calls} remaining</span>
          </div>
          {usagePct > 80 && (
            <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm">
              <AlertTriangle size={14} />
              <span>Running low on quota. <Link to="/dashboard/billing" className="underline hover:text-yellow-300">Upgrade your plan</Link></span>
            </div>
          )}
        </div>
      )}

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/dashboard/api-keys" className="card hover:border-gray-700 transition-colors group flex items-center justify-between">
          <div>
            <div className="font-semibold text-white mb-1">Manage API Keys</div>
            <div className="text-sm text-gray-400">Create or revoke your keys</div>
          </div>
          <ArrowUpRight size={18} className="text-gray-600 group-hover:text-brand-400 transition-colors" />
        </Link>
        <Link to="/dashboard/playground" className="card hover:border-gray-700 transition-colors group flex items-center justify-between">
          <div>
            <div className="font-semibold text-white mb-1">API Playground</div>
            <div className="text-sm text-gray-400">Test your model in the browser</div>
          </div>
          <ArrowUpRight size={18} className="text-gray-600 group-hover:text-brand-400 transition-colors" />
        </Link>
        <Link to="/dashboard/usage" className="card hover:border-gray-700 transition-colors group flex items-center justify-between">
          <div>
            <div className="font-semibold text-white mb-1">Usage History</div>
            <div className="text-sm text-gray-400">View recent API calls</div>
          </div>
          <ArrowUpRight size={18} className="text-gray-600 group-hover:text-brand-400 transition-colors" />
        </Link>
        <Link to="/dashboard/billing" className="card hover:border-gray-700 transition-colors group flex items-center justify-between">
          <div>
            <div className="font-semibold text-white mb-1">Billing & Plan</div>
            <div className="text-sm text-gray-400">Upgrade or manage subscription</div>
          </div>
          <ArrowUpRight size={18} className="text-gray-600 group-hover:text-brand-400 transition-colors" />
        </Link>
      </div>
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { Lock, Loader2, AlertTriangle, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'

const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || ''

function UpgradeGate() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-950">
      <div className="text-center max-w-sm px-6">
        <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-5">
          <Lock size={28} className="text-gray-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Full features require a subscription</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Upgrade to <strong className="text-white">Pro</strong> or{' '}
          <strong className="text-white">Enterprise</strong> to unlock daily AI recommendations,
          advanced risk analysis, and real-time signals.
        </p>
        <Link to="/dashboard/billing" className="btn-primary">Upgrade now</Link>
        <p className="mt-4 text-xs text-gray-600">
          Already subscribed? It may take a minute to activate.{' '}
          <button onClick={() => window.location.reload()} className="text-brand-400 hover:underline">Refresh</button>
        </p>
      </div>
    </div>
  )
}

function NoDashboardConfigured() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-950">
      <div className="text-center max-w-sm px-6 card border-yellow-800/40 bg-yellow-900/10">
        <AlertTriangle size={28} className="text-yellow-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-white mb-2">Dashboard URL not configured</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Set <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded">VITE_DASHBOARD_URL</code> in your{' '}
          <code className="text-yellow-300 bg-gray-800 px-1.5 py-0.5 rounded">.env</code> file to point to your hosted dashboard.
        </p>
      </div>
    </div>
  )
}

export default function Overview() {
  const user = useAuthStore((s) => s.user)
  const isPaidUser = user?.plan === 'pro' || user?.plan === 'enterprise'

  const { data: stats, isLoading } = useQuery({
    queryKey: ['usage-stats'],
    queryFn: () => api.get('/usage/stats').then(r => r.data),
    enabled: isPaidUser,
  })

  if (!isPaidUser) return <UpgradeGate />
  if (!DASHBOARD_URL) return <NoDashboardConfigured />

  // Build iframe src — pass plan + email as query params so the dashboard
  // can optionally use them (e.g. to show user-specific data)
  const iframeSrc = new URL(DASHBOARD_URL)
  if (user?.email) iframeSrc.searchParams.set('email', user.email)
  if (user?.plan) iframeSrc.searchParams.set('plan', user.plan)

  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Thin top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            Logged in as <strong className="text-white">{user?.email}</strong>
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            user?.plan === 'enterprise' ? 'badge-enterprise' : 'badge-pro'
          }`}>
            {user?.plan}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {stats && (
            <span className="text-xs text-gray-500">
              {stats.calls_this_month} / {stats.monthly_limit.toLocaleString()} API calls this month
            </span>
          )}
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Open in new tab <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Iframe */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={28} className="animate-spin text-brand-500" />
        </div>
      ) : (
        <iframe
          src={iframeSrc.toString()}
          title="PortfoliAI Dashboard"
          className="flex-1 w-full border-0"
          style={{ minHeight: 'calc(100vh - 104px)' }}
          allow="clipboard-read; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        />
      )}
    </div>
  )
}

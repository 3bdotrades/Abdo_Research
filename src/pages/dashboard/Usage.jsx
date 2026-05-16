import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import api from '../../utils/api'

export default function Usage() {
  const { data: stats } = useQuery({ queryKey: ['usage-stats'], queryFn: () => api.get('/usage/stats').then(r => r.data) })
  const { data: history = [], isLoading } = useQuery({ queryKey: ['usage-history'], queryFn: () => api.get('/usage/history').then(r => r.data) })

  // Group by day for chart
  const dailyData = history.reduce((acc, log) => {
    const day = new Date(log.created_at).toLocaleDateString('en', { month: 'short', day: 'numeric' })
    const existing = acc.find(d => d.day === day)
    if (existing) { existing.calls++; existing.total_ms += log.response_time_ms || 0 }
    else acc.push({ day, calls: 1, total_ms: log.response_time_ms || 0 })
    return acc
  }, []).slice(-14).reverse()

  const usagePct = stats ? Math.round((stats.calls_this_month / stats.monthly_limit) * 100) : 0

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Usage</h1>
        <p className="text-gray-500 text-sm">API call history and quota tracking.</p>
      </div>

      {stats && (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            ['This month', stats.calls_this_month, 'calls'],
            ['Monthly limit', stats.monthly_limit.toLocaleString(), 'calls'],
            ['Remaining', stats.remaining_calls.toLocaleString(), 'calls'],
          ].map(([label, value, unit]) => (
            <div key={label} className="card text-center">
              <div className="text-3xl font-bold text-white mb-1">{value}</div>
              <div className="text-sm text-gray-400">{label}</div>
              <div className="text-xs text-gray-600">{unit}</div>
            </div>
          ))}
        </div>
      )}

      {/* Quota bar */}
      {stats && (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Monthly quota</span>
            <span className="text-sm font-semibold text-gray-300">{usagePct}% used</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${usagePct > 90 ? 'bg-red-500' : usagePct > 70 ? 'bg-yellow-500' : 'bg-brand-500'}`}
              style={{ width: `${Math.min(usagePct, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>0</span><span>{stats.monthly_limit.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Chart */}
      {dailyData.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-sm font-semibold text-gray-300 mb-6">Daily calls (last 14 days)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 8 }} labelStyle={{ color: '#f9fafb' }} itemStyle={{ color: '#818cf8' }} />
              <Bar dataKey="calls" fill="#5c6ef5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* History table */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Recent calls (last 100)</h2>
        {isLoading ? (
          <div className="py-10 text-center"><Loader2 size={24} className="animate-spin mx-auto text-gray-600" /></div>
        ) : history.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No API calls yet. Make your first request to see history here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-500 py-2 pr-4 font-medium">Status</th>
                  <th className="text-left text-gray-500 py-2 pr-4 font-medium">Endpoint</th>
                  <th className="text-left text-gray-500 py-2 pr-4 font-medium">Response time</th>
                  <th className="text-left text-gray-500 py-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {history.map((log, i) => (
                  <tr key={i} className="hover:bg-gray-800/30">
                    <td className="py-2.5 pr-4">
                      {log.status_code < 400
                        ? <CheckCircle2 size={14} className="text-green-400" />
                        : <XCircle size={14} className="text-red-400" />}
                    </td>
                    <td className="py-2.5 pr-4 text-gray-300 font-mono text-xs">{log.endpoint}</td>
                    <td className="py-2.5 pr-4 text-gray-400">{log.response_time_ms ? `${Math.round(log.response_time_ms)}ms` : '—'}</td>
                    <td className="py-2.5 text-gray-500 text-xs">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Play, Loader2, AlertTriangle } from 'lucide-react'
import api from '../../utils/api'
import toast from 'react-hot-toast'

const DEFAULT_INPUT = JSON.stringify({ features: [1.2, 3.4, 5.6] }, null, 2)

export default function Playground() {
  const [model, setModel] = useState('default')
  const [input, setInput] = useState(DEFAULT_INPUT)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { data: models = [] } = useQuery({
    queryKey: ['models'],
    queryFn: () => api.get('/ml/models').then(r => r.data),
  })

  const run = async () => {
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const data = JSON.parse(input)
      const { data: res } = await api.post('/ml/predict', { model, data })
      setResult(res)
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON in input')
      } else {
        const msg = err.response?.data?.detail || 'Request failed'
        setError(msg)
        if (err.response?.status === 429) toast.error('Quota exceeded — upgrade your plan')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">API Playground</h1>
        <p className="text-gray-500 text-sm">Test your ML model directly in the browser using your account credentials.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="input"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>{m.name} — {m.description}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Request body (JSON)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input font-mono text-sm resize-none h-52"
              spellCheck={false}
            />
          </div>

          <button onClick={run} disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <><Play size={16} /> Run prediction</>}
          </button>

          <div className="p-3 rounded-xl bg-yellow-900/10 border border-yellow-800/30 flex gap-2">
            <AlertTriangle size={14} className="text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-200/60 leading-relaxed">
              Each run counts toward your monthly quota. Results are statistical estimates — not guaranteed outcomes.
              See our <a href="/risk-disclosure" className="text-yellow-400 underline">Risk Disclosure</a>.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Response</label>
          <div className="bg-gray-900 border border-gray-800 rounded-xl h-[calc(100%-2rem)] min-h-52 p-4 font-mono text-sm overflow-auto">
            {loading && (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 size={14} className="animate-spin" /> Running...
              </div>
            )}
            {error && (
              <div className="text-red-400">{error}</div>
            )}
            {result && (
              <pre className="text-green-300 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
            )}
            {!loading && !error && !result && (
              <span className="text-gray-600">// Response will appear here</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

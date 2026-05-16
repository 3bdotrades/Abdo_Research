import { useState } from 'react'
import { Terminal, Key, BarChart3, Cpu, ChevronRight } from 'lucide-react'

const SECTIONS = [
  {
    id: 'quickstart', icon: Terminal, title: 'Quickstart',
    content: (
      <div className="space-y-4">
        <p className="text-gray-400">Get your first prediction in under 5 minutes.</p>
        <h3 className="text-white font-semibold">1. Create an account &amp; generate an API key</h3>
        <p className="text-gray-400 text-sm">Sign up at <code className="text-brand-300 bg-gray-800 px-1.5 py-0.5 rounded">/register</code>, then go to <strong className="text-white">Dashboard → API Keys</strong> to create a key.</p>
        <h3 className="text-white font-semibold">2. Make your first request</h3>
        <CodeBlock lang="bash" code={`curl -X POST https://api.abdoresearch.com/api/v1/ml/predict \\
  -H "Authorization: Bearer ar_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "default", "data": {"features": [1.0, 2.0, 3.0]}}'`} />
        <h3 className="text-white font-semibold">3. Response</h3>
        <CodeBlock lang="json" code={`{
  "result": {
    "prediction": 0.87,
    "confidence": 0.94,
    "model": "default"
  },
  "usage": { "calls_this_request": 1 }
}`} />
      </div>
    ),
  },
  {
    id: 'auth', icon: Key, title: 'Authentication',
    content: (
      <div className="space-y-4">
        <p className="text-gray-400">All API requests require authentication via a Bearer token.</p>
        <h3 className="text-white font-semibold">API Key authentication</h3>
        <CodeBlock lang="bash" code={`-H "Authorization: Bearer ar_YOUR_API_KEY"`} />
        <h3 className="text-white font-semibold">JWT authentication (web sessions)</h3>
        <CodeBlock lang="bash" code={`-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`} />
        <div className="p-4 rounded-xl bg-yellow-900/20 border border-yellow-700/40">
          <p className="text-yellow-300 text-sm font-semibold mb-1">Keep your keys safe</p>
          <p className="text-yellow-200/70 text-sm">Never commit API keys to source control. Use environment variables. Revoke compromised keys immediately from your dashboard.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'endpoints', icon: Cpu, title: 'Endpoints',
    content: (
      <div className="space-y-6">
        <EndpointCard method="POST" path="/api/v1/ml/predict" desc="Submit data for ML inference." body='{"model": "default", "data": {"features": [...]}}' />
        <EndpointCard method="GET" path="/api/v1/ml/models" desc="List models available for your plan." />
        <EndpointCard method="GET" path="/api/v1/usage/stats" desc="Get your current usage and quota stats." />
        <EndpointCard method="GET" path="/api/v1/usage/history" desc="Get last 100 API call logs." />
        <EndpointCard method="GET" path="/api/v1/api-keys" desc="List your active API keys." />
        <EndpointCard method="POST" path="/api/v1/api-keys" desc="Create a new API key." body='{"name": "my-key"}' />
        <EndpointCard method="DELETE" path="/api/v1/api-keys/{id}" desc="Revoke an API key." />
      </div>
    ),
  },
  {
    id: 'quotas', icon: BarChart3, title: 'Rate limits & Quotas',
    content: (
      <div className="space-y-4">
        <p className="text-gray-400">Each plan has a monthly API call quota. Once exceeded, calls return <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">429 Too Many Requests</code>.</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 py-2 pr-4">Plan</th>
              <th className="text-left text-gray-400 py-2 pr-4">Monthly quota</th>
              <th className="text-left text-gray-400 py-2">Models</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {[['Free', '100', 'Default'], ['Pro', '10,000', 'Default + Advanced'], ['Enterprise', '1,000,000+', 'All + Custom']].map(([p, q, m]) => (
              <tr key={p}>
                <td className="py-2.5 pr-4 text-white font-medium">{p}</td>
                <td className="py-2.5 pr-4 text-gray-300">{q}</td>
                <td className="py-2.5 text-gray-300">{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-gray-500 text-sm">Quotas reset on the 1st of each month (UTC).</p>
      </div>
    ),
  },
]

function CodeBlock({ code, lang }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
        <span className="text-gray-500 text-xs font-mono">{lang}</span>
      </div>
      <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">{code}</pre>
    </div>
  )
}

function EndpointCard({ method, path, desc, body }) {
  const colors = { GET: 'text-green-400 bg-green-900/30', POST: 'text-blue-400 bg-blue-900/30', DELETE: 'text-red-400 bg-red-900/30' }
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-2">
        <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${colors[method]}`}>{method}</span>
        <code className="text-brand-300 text-sm">{path}</code>
      </div>
      <p className="text-gray-400 text-sm mb-2">{desc}</p>
      {body && <CodeBlock lang="json" code={body} />}
    </div>
  )
}

export default function Docs() {
  const [active, setActive] = useState('quickstart')
  const section = SECTIONS.find((s) => s.id === active)

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-gray-400">Everything you need to integrate the Abdo Research ML API.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-56 shrink-0">
            <nav className="space-y-1 sticky top-20">
              {SECTIONS.map(({ id, icon: Icon, title }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                    active === id ? 'bg-brand-900/60 text-brand-300 border border-brand-800/50' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon size={16} />
                  {title}
                  {active === id && <ChevronRight size={14} className="ml-auto" />}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 card">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
              {section && <section.icon size={20} className="text-brand-400" />}
              <h2 className="text-xl font-bold text-white">{section?.title}</h2>
            </div>
            {section?.content}
          </div>
        </div>
      </div>
    </div>
  )
}

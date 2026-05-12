import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, BarChart3, Code2, CheckCircle2, Globe } from 'lucide-react'

const FEATURES = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-100ms inference latency with optimized model serving and global edge caching.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'API key auth, rate limiting, TLS encryption, and SOC 2-ready infrastructure.' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Monitor every API call, response time, and quota usage from your dashboard.' },
  { icon: Code2, title: 'Simple REST API', desc: 'One endpoint, one JSON payload. Integrate in minutes with any language or framework.' },
  { icon: Globe, title: 'Multi-model Support', desc: 'Access default, advanced, and custom enterprise models from a single API key.' },
  { icon: CheckCircle2, title: '99.9% Uptime SLA', desc: 'Pro and Enterprise plans backed by an uptime guarantee and priority support.' },
]

const STEPS = [
  { num: '01', title: 'Create an account', desc: 'Sign up free, no credit card required.' },
  { num: '02', title: 'Generate an API key', desc: 'Create a key from your dashboard in seconds.' },
  { num: '03', title: 'Call the API', desc: 'POST your data, get predictions instantly.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-gray-950 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-700/50 text-brand-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Now in public beta
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            ML Inference{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">
              as a Service
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Access state-of-the-art machine learning models via a single REST API.
            Built for researchers, developers, and enterprises who need reliable predictions at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5">
              Start for free <ArrowRight size={18} />
            </Link>
            <Link to="/docs" className="btn-secondary text-base px-8 py-3.5">
              View documentation
            </Link>
          </div>

          {/* Code snippet */}
          <div className="mt-16 text-left max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/80">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-gray-500 text-xs font-mono">curl</span>
            </div>
            <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
{`curl -X POST https://api.abdoresearch.com/v1/ml/predict \\
  -H "Authorization: Bearer ar_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "default",
    "data": { "features": [1.2, 3.4, 5.6] }
  }'`}
            </pre>
            <div className="border-t border-gray-800 px-5 py-3 bg-gray-900/50">
              <pre className="text-sm font-mono text-green-400">
{`{ "result": { "prediction": 0.87, "confidence": 0.94 } }`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-800/50 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['< 100ms', 'Avg latency'], ['99.9%', 'Uptime SLA'], ['3 Plans', 'Free to Enterprise'], ['REST API', 'Simple integration']].map(([v, l]) => (
            <div key={l}>
              <div className="text-3xl font-bold text-white mb-1">{v}</div>
              <div className="text-gray-500 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything you need to ship ML</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">From your first prototype to production at scale, we've got the infrastructure covered.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card hover:border-gray-700 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4 group-hover:bg-brand-800/60 transition-colors">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Get started in 3 steps</h2>
          <p className="text-gray-400 mb-16">From zero to predictions in under 5 minutes.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                <div className="text-6xl font-extrabold text-gray-800 mb-4">{num}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5">
              Create your free account <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center card border-brand-800/40 bg-gradient-to-b from-brand-950/40 to-gray-900 py-16">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to start predicting?</h2>
          <p className="text-gray-400 mb-8 text-lg">Free tier includes 100 API calls/month. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5">Get started free</Link>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-3.5">View pricing</Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            By using this service you agree to our{' '}
            <Link to="/risk-disclosure" className="text-brand-400 hover:underline">Risk Disclosure</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}

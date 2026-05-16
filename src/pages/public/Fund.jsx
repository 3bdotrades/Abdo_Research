import { Link } from 'react-router-dom'
import { BarChart3, TrendingUp, Target, ShieldCheck, Users } from 'lucide-react'

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const PERFORMANCE = [
  ['1 Month',  '+8.7%',  '+2.3%'],
  ['3 Months', '+22.4%', '+9.2%'],
  ['YTD',      '+38.2%', '+24.1%'],
  ['1 Year',   '+42.1%', '+28.5%'],
]

export default function Fund() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-14 px-4 border-b border-gray-800/80">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/70 border border-brand-800/50 text-brand-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Live Portfolio Data
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4">Abdo Research Portfolio</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our AI model manages a real portfolio — every position, return, and decision is tracked transparently against the S&P 500 benchmark.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            <div className="card p-8 bg-gradient-to-br from-brand-950/50 to-gray-900 border-brand-900/40">
              <div className="text-sm text-gray-400 mb-2">YTD Return</div>
              <div className="text-5xl font-extrabold text-accent-400 mb-2">+38.2%</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">S&P 500: +24.1%</span>
                <span className="text-xs text-accent-400 font-semibold">+14.1% alpha</span>
              </div>
            </div>
            <div className="card p-8">
              <div className="text-sm text-gray-400 mb-2">Sharpe Ratio</div>
              <div className="text-5xl font-extrabold text-brand-400 mb-2">2.1</div>
              <div className="text-xs text-gray-500">Risk-adjusted return metric</div>
            </div>
            <div className="card p-8">
              <div className="text-sm text-gray-400 mb-2">Max Drawdown</div>
              <div className="text-5xl font-extrabold text-white mb-2">-8.3%</div>
              <div className="text-xs text-gray-500">Peak to trough loss</div>
            </div>
          </div>

          {/* Returns table */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-bold text-white">Returns vs S&P 500</h3>
              </div>
              <div className="grid grid-cols-3 px-6 py-3 bg-gray-800/30 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Period</span>
                <span className="text-accent-400">Portfolio</span>
                <span>S&P 500</span>
              </div>
              {PERFORMANCE.map(([period, fund, spy]) => (
                <div key={period} className="grid grid-cols-3 px-6 py-4 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-400">{period}</span>
                  <span className="font-bold text-accent-400">{fund}</span>
                  <span className="text-gray-500">{spy}</span>
                </div>
              ))}
            </div>

            <div className="card p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-bold text-white">Monthly Stats</h3>
              </div>
              {[
                ['Signal Win Rate', '82%', 'text-accent-400'],
                ['Avg Trade Return', '+1.8%', 'text-accent-400'],
                ['Best Month', '+18.2% (Mar)', 'text-accent-400'],
                ['Worst Month', '-5.1% (Feb)', 'text-red-400'],
                ['Total Signals', '127 (30-day)', 'text-white'],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex items-center justify-between px-6 py-4 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-400">{label}</span>
                  <span className={`font-bold ${cls}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10">How the Model Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center">
                  <Target size={18} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-white">Stock Selection Model</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <p><span className="text-white font-medium">Strategy:</span> AI momentum + mean-reversion hybrid</p>
                <p><span className="text-white font-medium">Universe:</span> US equities, options, select crypto</p>
                <p><span className="text-white font-medium">Hold Period:</span> Minutes to weeks</p>
                <p><span className="text-white font-medium">Target Annual Return:</span> 30–50%</p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center">
                  <ShieldCheck size={18} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-white">Risk Controls</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <p><span className="text-white font-medium">Max Position Size:</span> 10% per trade</p>
                <p><span className="text-white font-medium">Stop Loss:</span> Required on every signal</p>
                <p><span className="text-white font-medium">Max Drawdown Limit:</span> 15%</p>
                <p><span className="text-white font-medium">Reporting:</span> Full trade history published</p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center">
                  <BarChart3 size={18} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-white">Signal Generation</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <p><span className="text-white font-medium">Signals per day:</span> 3–8 on average</p>
                <p><span className="text-white font-medium">Update frequency:</span> Every 15 minutes</p>
                <p><span className="text-white font-medium">Delivery:</span> Telegram + dashboard</p>
                <p><span className="text-white font-medium">Confidence scoring:</span> 0–100% per signal</p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center">
                  <Users size={18} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-white">Community</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <p><span className="text-white font-medium">Active members:</span> 12,000+</p>
                <p><span className="text-white font-medium">Telegram:</span> Real-time signal alerts</p>
                <p><span className="text-white font-medium">YouTube:</span> Weekly research videos</p>
                <p><span className="text-white font-medium">Track record:</span> Fully transparent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Mirror our portfolio</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Subscribe to get every signal we trade. Execute in your own broker and track your results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/abdoresearch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              <TelegramIcon /> Join on Telegram
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">
              Subscribe to Signals
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            Past performance does not guarantee future results.{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">Risk Disclosure</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

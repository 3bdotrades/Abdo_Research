import { TrendingUp, TrendingDown, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const LIVE_SIGNALS = [
  { symbol: 'NVDA', action: 'BUY',  entry: 142.30, target: 156.80, stop: 138.50, confidence: 87, time: '2:34 PM' },
  { symbol: 'TSLA', action: 'SELL', entry: 245.50, target: 230.20, stop: 252.10, confidence: 81, time: '1:12 PM' },
  { symbol: 'AAPL', action: 'BUY',  entry: 189.45, target: 198.30, stop: 185.20, confidence: 79, time: '12:48 PM' },
  { symbol: 'SPY',  action: 'SELL', entry: 485.20, target: 475.50, stop: 490.30, confidence: 85, time: '11:30 AM' },
  { symbol: 'QQQ',  action: 'BUY',  entry: 378.90, target: 395.40, stop: 374.10, confidence: 88, time: '10:15 AM' },
  { symbol: 'MSFT', action: 'HOLD', entry: 420.30, target: 435.60, stop: 415.50, confidence: 76, time: '9:45 AM' },
]

export default function Signals() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-14 px-4 border-b border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/70 border border-brand-800/50 text-brand-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Updated every 15 minutes
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4">Live Trading Signals</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Real-time algorithmic signals with entry, target, stop loss, and confidence score. Get instant alerts on Telegram.
          </p>
          <div className="mt-8 flex flex-wrap gap-10">
            {[
              ['82%', 'Win Rate (30-day)'],
              ['+1.8%', 'Avg Trade Return'],
              ['Every 15min', 'Signal Updates'],
              ['12 Active', 'Open Signals Today'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl font-extrabold text-brand-400">{v}</div>
                <div className="text-sm text-gray-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="py-8 px-4 bg-gradient-to-r from-brand-950/60 to-gray-900/60 border-b border-brand-900/30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Get signals the moment they fire</p>
            <p className="text-gray-400 text-sm">Join our Telegram channel for real-time alerts, market commentary, and signal history.</p>
          </div>
          <a
            href="https://t.me/abdoresearch"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            <TelegramIcon /> Join Telegram — Free
          </a>
        </div>
      </section>

      {/* Signals Table */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Today&apos;s Signals</h2>
            <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">Preview — delayed 24h on free plan</span>
          </div>
          <div className="space-y-4">
            {LIVE_SIGNALS.map((signal) => (
              <div key={signal.symbol} className="card hover:border-gray-700 transition-colors">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Symbol</div>
                    <div className="text-xl font-extrabold text-white">${signal.symbol}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Action</div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-sm ${
                      signal.action === 'BUY'  ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20' :
                      signal.action === 'SELL' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                      'bg-gray-700/40 text-gray-300 border border-gray-700/40'
                    }`}>
                      {signal.action === 'BUY'  ? <TrendingUp size={14} /> :
                       signal.action === 'SELL' ? <TrendingDown size={14} /> :
                       <Target size={14} />}
                      {signal.action}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Entry</div>
                    <div className="text-lg font-bold text-white">${signal.entry.toFixed(2)}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Target</div>
                    <div className="text-lg font-bold text-white">${signal.target.toFixed(2)}</div>
                    <div className="text-xs text-accent-400 font-medium">
                      +{(((signal.target - signal.entry) / signal.entry) * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Stop Loss</div>
                    <div className="text-lg font-bold text-white">${signal.stop.toFixed(2)}</div>
                    <div className="text-xs text-red-400 font-medium">
                      {(((signal.stop - signal.entry) / signal.entry) * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Confidence</div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-400 rounded-full"
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white w-8 shrink-0">{signal.confidence}%</span>
                    </div>
                    <div className="text-xs text-gray-600">{signal.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">30-Day Signal Performance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-semibold text-white">Signal Statistics</h3>
              </div>
              {[
                ['Total Signals',   '127',  'text-white'],
                ['Winning Signals', '104',  'text-accent-400'],
                ['Win Rate',        '82%',  'text-accent-400'],
                ['Avg Win',         '+2.1%','text-accent-400'],
                ['Avg Loss',        '-1.2%','text-red-400'],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex items-center justify-between px-6 py-3.5 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className={`font-bold ${cls}`}>{value}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <h3 className="font-semibold text-white mb-5">Asset Class Distribution</h3>
              <div className="space-y-5">
                {[
                  ['US Equities', '65%', '82 signals'],
                  ['Options',     '20%', '25 signals'],
                  ['Crypto',      '15%', '20 signals'],
                ].map(([asset, pct, count]) => (
                  <div key={asset}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-gray-400 text-sm">{asset}</span>
                      <span className="text-white font-bold text-sm">{pct}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 rounded-full" style={{ width: pct }} />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Signal</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join our Telegram for real-time alerts, or upgrade to Pro for full access via the dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/abdoresearch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              <TelegramIcon /> Join Telegram Free
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">
              View Pro Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

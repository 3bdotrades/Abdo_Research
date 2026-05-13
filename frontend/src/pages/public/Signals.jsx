import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react'

const LIVE_SIGNALS = [
  { symbol: 'NVDA', action: 'BUY', entry: 142.30, target: 156.80, stop: 138.50, confidence: 87, time: '2:34 PM' },
  { symbol: 'TSLA', action: 'SELL', entry: 245.50, target: 230.20, stop: 252.10, confidence: 81, time: '1:12 PM' },
  { symbol: 'AAPL', action: 'BUY', entry: 189.45, target: 198.30, stop: 185.20, confidence: 79, time: '12:48 PM' },
  { symbol: 'SPY', action: 'SELL', entry: 485.20, target: 475.50, stop: 490.30, confidence: 85, time: '11:30 AM' },
  { symbol: 'QQQ', action: 'BUY', entry: 378.90, target: 395.40, stop: 374.10, confidence: 88, time: '10:15 AM' },
  { symbol: 'MSFT', action: 'HOLD', entry: 420.30, target: 435.60, stop: 415.50, confidence: 76, time: '9:45 AM' },
]

export default function Signals() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4">Live Trading Signals</h1>
          <p className="text-xl text-gray-400">Real-time algorithmic trading signals with entry/exit prices, risk management, and confidence scores.</p>
          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <div className="text-sm text-gray-400">Win Rate (30-day)</div>
              <div className="text-3xl font-bold text-accent-400">82%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Avg Trade Return</div>
              <div className="text-3xl font-bold text-accent-400">+1.8%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Signal Updates</div>
              <div className="text-3xl font-bold text-accent-400">Every 15min</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Active Signals</div>
              <div className="text-3xl font-bold text-accent-400">12</div>
            </div>
          </div>
        </div>
      </section>

      {/* Signals Table */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Today&apos;s Signals</h2>
          <div className="space-y-4">
            {LIVE_SIGNALS.map((signal) => (
              <div key={signal.symbol} className="card p-6 hover:border-gray-700 transition-colors">
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Symbol</div>
                    <div className="text-xl font-bold text-white">${signal.symbol}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Action</div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold ${
                      signal.action === 'BUY' ? 'bg-green-500/20 text-green-400' :
                      signal.action === 'SELL' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-700/40 text-gray-300'
                    }`}>
                      {signal.action === 'BUY' ? <TrendingUp size={16} /> : signal.action === 'SELL' ? <TrendingDown size={16} /> : <Target size={16} />}
                      {signal.action}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">Entry</div>
                    <div className="text-lg font-semibold text-white">${signal.entry.toFixed(2)}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">Target</div>
                    <div className="text-lg font-semibold text-white">${signal.target.toFixed(2)}</div>
                    <div className="text-xs text-green-400">+{(((signal.target - signal.entry) / signal.entry) * 100).toFixed(1)}%</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">Stop Loss</div>
                    <div className="text-lg font-semibold text-white">${signal.stop.toFixed(2)}</div>
                    <div className="text-xs text-red-400">{(((signal.stop - signal.entry) / signal.entry) * 100).toFixed(1)}%</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-1">Confidence</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-400 rounded-full" style={{ width: `${signal.confidence}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-white">{signal.confidence}%</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{signal.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">How to Use Trading Signals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <span className="text-brand-400 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Receive Signals</h3>
              <p className="text-gray-400 text-sm">Get real-time alerts via email, SMS, or dashboard whenever our algorithm generates a new trade signal.</p>
            </div>
            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <span className="text-brand-400 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Review Details</h3>
              <p className="text-gray-400 text-sm">Check entry price, target, stop loss, and confidence score. Review market context and technical analysis breakdown.</p>
            </div>
            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <span className="text-brand-400 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Execute & Track</h3>
              <p className="text-gray-400 text-sm">Execute in your brokerage. Track your P&L and compare against our fund&apos;s performance in your dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Signal Performance Metrics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <h3 className="font-semibold text-white mb-6">Last 30 Days</h3>
              <div className="space-y-4">
                {[['Total Signals', '127'], ['Winning Signals', '104'], ['Win Rate', '82%'], ['Avg Win', '+2.1%'], ['Avg Loss', '-1.2%']].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-8">
              <h3 className="font-semibold text-white mb-6">Asset Class Distribution</h3>
              <div className="space-y-4">
                {[['US Equities', '65%', '82 signals'], ['Options', '20%', '25 signals'], ['Crypto', '15%', '20 signals']].map(([asset, pct, count]) => (
                  <div key={asset}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">{asset}</span>
                      <span className="text-white font-semibold">{pct}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 rounded-full" style={{ width: pct }} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Signal</h2>
          <p className="text-gray-400 mb-8">Get real-time alerts and join thousands of traders using our signals. Upgrade to Pro or VIP for premium features.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="btn-primary text-base px-8 py-3.5">
              Get Started Free
            </a>
            <a href="/pricing" className="btn-secondary text-base px-8 py-3.5">
              View Plans
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

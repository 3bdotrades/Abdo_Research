import { BookOpen, Download, Lock, TrendingUp } from 'lucide-react'

const REPORTS = [
  { id: 1, title: 'AI & Semiconductor Sector Analysis Q1 2024', desc: 'Deep dive into NVIDIA, AMD, TSMC valuations and future outlook. Technical analysis and price targets included.', date: 'Mar 14, 2024', free: true },
  { id: 2, title: 'Options Strategy Guide: Selling Covered Calls', desc: 'Comprehensive guide to covered call strategies with backtest results. Best practices for income generation.', date: 'Mar 10, 2024', free: true },
  { id: 3, title: 'Tech Earnings Season Playbook', desc: 'How we trade around earnings. Pre-earnings volatility strategies and post-earnings swing trade setups.', date: 'Mar 5, 2024', free: false },
  { id: 4, title: 'Crypto Market Structure & Trading Setups', desc: 'Bitcoin correlation patterns, altcoin momentum trades, and DeFi opportunities. Signal generation logic explained.', date: 'Feb 28, 2024', free: false },
  { id: 5, title: 'Macro Outlook: Fed Policy Impact on Equities', desc: 'How Fed decisions move markets. Interest rate scenarios and portfolio positioning recommendations for each.', date: 'Feb 20, 2024', free: false },
  { id: 6, title: 'Technical Analysis: Support/Resistance Levels (March)', desc: 'Critical price levels for major indices and stocks. Updated weekly with new support/resistance breakouts.', date: 'Feb 15, 2024', free: false },
]

export default function Research() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4">Market Research & Analysis</h1>
          <p className="text-xl text-gray-400">Professional-grade market research, technical analysis, and trading strategies from our team of analysts and traders.</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <BookOpen size={20} className="text-brand-400" />
              <span>50+ reports published</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-2xl">•</span>
              <span>Updated weekly</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-2xl">•</span>
              <span>VIP+ exclusive access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Research Reports */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Reports</h2>
          <div className="grid gap-6">
            {REPORTS.map((report) => (
              <div key={report.id} className="card p-6 hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                      {!report.free && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-brand-900/60 border border-brand-800/50 text-brand-300 text-xs font-medium">
                          <Lock size={12} />
                          VIP Only
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{report.desc}</p>
                    <div className="text-xs text-gray-500">{report.date}</div>
                  </div>
                  <button className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    report.free 
                      ? 'bg-brand-600 hover:bg-brand-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}>
                    <span className="flex items-center gap-2">
                      <Download size={16} />
                      {report.free ? 'Download' : 'Unlock'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Categories */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Research Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <TrendingUp size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Technical Analysis</h3>
              <p className="text-gray-400 text-sm mb-4">Weekly updates with support/resistance levels, chart patterns, and breakout opportunities.</p>
              <span className="text-xs text-gray-500">12 reports</span>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <BookOpen size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Sector Analysis</h3>
              <p className="text-gray-400 text-sm mb-4">Deep dives into tech, healthcare, energy, and financials with valuations and catalysts.</p>
              <span className="text-xs text-gray-500">18 reports</span>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <TrendingUp size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Trading Strategies</h3>
              <p className="text-gray-400 text-sm mb-4">Options strategies, swing trade setups, and backtested trading systems with performance data.</p>
              <span className="text-xs text-gray-500">15 reports</span>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <BookOpen size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Macro Analysis</h3>
              <p className="text-gray-400 text-sm mb-4">Economic trends, Fed policy impact, interest rate scenarios, and geopolitical risk analysis.</p>
              <span className="text-xs text-gray-500">10 reports</span>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <TrendingUp size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Crypto & Digital Assets</h3>
              <p className="text-gray-400 text-sm mb-4">Bitcoin correlation patterns, altcoin analysis, DeFi opportunities, and on-chain metrics.</p>
              <span className="text-xs text-gray-500">5 reports</span>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-900/60 border border-brand-800/50 flex items-center justify-center mb-4">
                <BookOpen size={20} className="text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Earnings & Events</h3>
              <p className="text-gray-400 text-sm mb-4">Pre-earnings analysis, volatility playbooks, and post-event swing trade opportunities.</p>
              <span className="text-xs text-gray-500">8 reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Free Tier</h3>
              <ul className="space-y-3">
                {['Access to 5 latest reports', 'Weekly technical analysis updates', 'Basic sector insights', 'Email digest of highlights'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">VIP+ Tier</h3>
              <ul className="space-y-3">
                {['All 50+ reports in archive', 'Daily trading strategies & setups', 'Real-time earnings analysis', 'Exclusive Discord community', 'Private analyst Q&A sessions'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Unlock Premium Research</h2>
          <p className="text-gray-400 mb-8">Get full access to all reports, strategies, and exclusive analysis. Upgrade to VIP+ to stay ahead of the market.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pricing" className="btn-primary text-base px-8 py-3.5">
              Upgrade to VIP+
            </a>
            <a href="/register" className="btn-secondary text-base px-8 py-3.5">
              Start Free
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

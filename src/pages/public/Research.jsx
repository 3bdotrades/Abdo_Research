import { BookOpen, Download, Lock, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const REPORTS = [
  {
    id: 1,
    title: 'AI & Semiconductor Sector Analysis Q1 2024',
    desc: 'Deep dive into NVIDIA, AMD, TSMC valuations and price targets. Full technical analysis with entry/exit levels.',
    date: 'Mar 14, 2024',
    category: 'Sector Analysis',
    free: true,
  },
  {
    id: 2,
    title: 'Options Strategy: Covered Calls for Income',
    desc: 'Comprehensive guide to covered call strategies with backtest results. Income generation best practices.',
    date: 'Mar 10, 2024',
    category: 'Strategy',
    free: true,
  },
  {
    id: 3,
    title: 'Tech Earnings Season Playbook',
    desc: 'Pre-earnings volatility strategies and post-earnings swing trade setups. Backtested signals included.',
    date: 'Mar 5, 2024',
    category: 'Earnings',
    free: false,
  },
  {
    id: 4,
    title: 'Crypto Market Structure & Trade Setups',
    desc: 'Bitcoin correlation patterns, altcoin momentum trades, and DeFi opportunities. Signal logic explained.',
    date: 'Feb 28, 2024',
    category: 'Crypto',
    free: false,
  },
  {
    id: 5,
    title: 'Macro Outlook: Fed Policy Impact on Equities',
    desc: 'Interest rate scenarios and portfolio positioning recommendations. Sector rotation framework.',
    date: 'Feb 20, 2024',
    category: 'Macro',
    free: false,
  },
  {
    id: 6,
    title: 'Support & Resistance Levels — March Update',
    desc: 'Critical price levels for major indices and stocks. Updated weekly with new breakout setups.',
    date: 'Feb 15, 2024',
    category: 'Technical',
    free: false,
  },
]

const CATEGORIES = [
  { label: 'Technical Analysis', count: 12, desc: 'Support/resistance levels, chart patterns, and breakout opportunities.' },
  { label: 'Sector Analysis',    count: 18, desc: 'Deep dives into tech, healthcare, energy, and financials.' },
  { label: 'Trading Strategies', count: 15, desc: 'Options strategies, swing trade setups, and backtested systems.' },
  { label: 'Macro Analysis',     count: 10, desc: 'Fed policy, interest rate scenarios, and geopolitical risk analysis.' },
  { label: 'Crypto & DeFi',      count: 5,  desc: 'Bitcoin patterns, altcoin analysis, and on-chain metrics.' },
  { label: 'Earnings & Events',  count: 8,  desc: 'Pre-earnings analysis and post-event trade opportunities.' },
]

export default function Research() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-14 px-4 border-b border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4">Market Research</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Professional-grade analysis, trading strategies, and sector deep-dives from our research team.
            Full reports in the hub, video breakdowns on YouTube.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <BookOpen size={18} className="text-brand-400" />
              <span>50+ reports published</span>
            </div>
            <span className="text-gray-700">•</span>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Updated weekly</span>
            </div>
            <span className="text-gray-700">•</span>
            <div className="flex items-center gap-2 text-gray-400">
              <span>VIP+ full access</span>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="py-8 px-4 bg-gradient-to-r from-red-950/30 to-gray-900/60 border-b border-red-900/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Watch on YouTube</p>
            <p className="text-gray-400 text-sm">Video breakdowns of every report — free on our YouTube channel.</p>
          </div>
          <a
            href="https://youtube.com/@abdoresearch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors whitespace-nowrap"
          >
            <YoutubeIcon /> Watch on YouTube
          </a>
        </div>
      </section>

      {/* Reports */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Reports</h2>
          <div className="space-y-4">
            {REPORTS.map((report) => (
              <div key={report.id} className="card hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 font-medium">
                        {report.category}
                      </span>
                      {!report.free && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-950/60 border border-brand-900/50 text-brand-300 text-xs font-medium">
                          <Lock size={11} /> VIP Only
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1.5">{report.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{report.desc}</p>
                    <div className="text-xs text-gray-600">{report.date}</div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-colors shrink-0 ${
                      report.free
                        ? 'bg-brand-600 hover:bg-brand-500 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Download size={14} />
                      {report.free ? 'Download' : 'Unlock'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Research Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(({ label, count, desc }) => (
              <div key={label} className="card hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{label}</h3>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{count} reports</span>
                </div>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Access Levels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-brand-400 font-bold text-sm mb-3 uppercase tracking-wider">Free</div>
              <ul className="space-y-2.5">
                {[
                  'Latest 2 reports each month',
                  'Weekly market newsletter',
                  'YouTube video analysis',
                  'Basic signal preview (24h delay)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card border-brand-900/50 bg-gradient-to-b from-brand-950/30 to-gray-900">
              <div className="text-brand-400 font-bold text-sm mb-3 uppercase tracking-wider">Pro</div>
              <ul className="space-y-2.5">
                {[
                  'Everything in Free, plus:',
                  'Real-time trading signals',
                  'Signal alerts on Telegram',
                  'Unlimited research reports',
                  'Premium sector reports',
                  'Signal history & analytics',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="text-brand-400 font-bold text-sm mb-3 uppercase tracking-wider">VIP+</div>
              <ul className="space-y-2.5">
                {[
                  'Everything in Pro, plus:',
                  'Full 50+ report archive',
                  'Daily trade ideas & setups',
                  'Direct analyst access (Slack)',
                  'Monthly strategy sessions',
                  'API access for integration',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Unlock Premium Research</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get full access to all reports, strategies, and exclusive analysis. Upgrade to VIP+.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="btn-primary text-base px-8 py-4">
              Upgrade to VIP+
            </Link>
            <a
              href="https://youtube.com/@abdoresearch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-4"
            >
              <YoutubeIcon /> Watch Free on YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

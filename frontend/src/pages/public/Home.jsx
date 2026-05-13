import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Target, BookOpen, CheckCircle2, Zap, LineChart as ChartIcon } from 'lucide-react'

const FEATURES = [
  { icon: Zap, title: 'Live Trading Signals', desc: 'Real-time buy/sell signals with entry/exit prices, stops, and targets updated every 15 minutes.' },
  { icon: TrendingUp, title: 'Fund Performance', desc: 'Track our hedge fund&apos;s YTD returns (38.2%), Sharpe ratio (2.1), and max drawdown (-8.3%) live.' },
  { icon: BookOpen, title: 'Institutional Research', desc: 'Premium market analysis, sector deep-dives, and technical research from professional analysts.' },
  { icon: ChartIcon, title: '82% Win Rate', desc: 'Our algorithms deliver win rates above 80% over rolling 30-day periods with consistent edge.' },
  { icon: Target, title: 'Multi-Asset Classes', desc: 'Signals for equities, options, and crypto optimized for each market regime and volatility condition.' },
  { icon: CheckCircle2, title: 'Subscriber Dashboard', desc: 'Real-time alerts, signal history, equity curves, and performance attribution for all trades.' },
]

const STEPS = [
  { num: '01', title: 'Choose Your Plan', desc: 'Free tier for signal previews, Pro for real-time alerts, VIP for premium research access.' },
  { num: '02', title: 'Get Real-Time Alerts', desc: 'Receive trading signals via email, SMS, and dashboard. Each includes full market context and analytics.' },
  { num: '03', title: 'Execute & Track', desc: 'Execute signals in your brokerage. Track performance and compare your results to our fund.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-gray-950 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-700/50 text-brand-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
            Trading Signals Live
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Algorithmic Trading Signals{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">
              for Day Traders
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get real-time trading signals, institutional-grade research, and track our hedge fund&apos;s performance. 
            Outperform the market with AI-driven market intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link to="/signals" className="btn-secondary text-base px-8 py-3.5">
              View Live Signals
            </Link>
          </div>

          {/* Code snippet */}
          <div className="mt-16 text-left max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/80">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-gray-500 text-xs font-mono">terminal</span>
            </div>
            <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
{`LIVE SIGNAL: BUY $NVDA
Entry: $142.30
Target: $156.80 (+10.2%)
Stop Loss: $138.50 (-2.7%)
Confidence: 87%
Time: 2:34 PM EST

SIGNAL ALERT: SELL $MA
Exit at market
Profit: +$234 (+2.1%)`}
            </pre>
            <div className="border-t border-gray-800 px-5 py-3 bg-gray-900/50">
              <pre className="text-sm font-mono text-accent-400">
{`Signal Win Rate: 82% (30-day)
Avg Trade: +1.8%
Max Drawdown: -2.1%
Sharpe Ratio: 2.1`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-800/50 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['38.2%', 'YTD Returns'], ['+12,000', 'Active Traders'], ['$85M+', 'AUM'], ['15min', 'Signal Updates']].map(([v, l]) => (
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
            <h2 className="text-4xl font-bold text-white mb-4">Why traders choose us</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Professional-grade signals, institutional research, and transparent fund performance.</p>
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
          <p className="text-gray-400 mb-16">Start receiving trading signals and research in under 5 minutes.</p>
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
              Create Your Free Account <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center card border-brand-800/40 bg-gradient-to-b from-brand-950/40 to-gray-900 py-16">
          <h2 className="text-4xl font-bold text-white mb-4">Join 12,000+ traders</h2>
          <p className="text-gray-400 mb-8 text-lg">Get your first signal free. Real-time alerts start in minutes. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5">Get Started Free</Link>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-3.5">View Pricing</Link>
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

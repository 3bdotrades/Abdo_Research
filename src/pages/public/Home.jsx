import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Zap, BookOpen, CheckCircle2, BarChart3, Target } from 'lucide-react'

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const PILLARS = [
  {
    icon: BarChart3,
    title: 'Portfolio Management',
    desc: 'Our AI model continuously tracks and selects stocks proven to outperform the S&P 500. Full transparency with live portfolio data.',
    stat: '+38.2% YTD',
    statLabel: 'vs +24.1% S&P 500',
    color: 'brand',
  },
  {
    icon: Zap,
    title: 'Real-Time Signals',
    desc: 'Get buy/sell signals delivered instantly to your Telegram with entry price, target, stop loss, and confidence score.',
    stat: '82% Win Rate',
    statLabel: '30-day rolling average',
    color: 'accent',
  },
  {
    icon: BookOpen,
    title: 'Market Research',
    desc: 'In-depth sector analysis, earnings previews, and macro research published weekly on YouTube and in our research hub.',
    stat: '50+ Reports',
    statLabel: 'Updated every week',
    color: 'brand',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Join the Community',
    desc: 'Follow on Telegram for real-time signals and subscribe on YouTube for in-depth research and market analysis.',
  },
  {
    num: '02',
    title: 'Get Your Signals',
    desc: 'Receive every trade alert with entry, target, stop loss, and the reasoning behind it. Never miss a setup.',
  },
  {
    num: '03',
    title: 'Execute & Track',
    desc: 'Execute in your own broker. Track your returns versus the benchmark inside the subscriber dashboard.',
  },
]

const PERFORMANCE = [
  ['1 Month',  '+8.7%',  '+2.3%'],
  ['3 Months', '+22.4%', '+9.2%'],
  ['YTD',      '+38.2%', '+24.1%'],
  ['1 Year',   '+42.1%', '+28.5%'],
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-950/70 via-gray-950 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-brand-500/4 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            Model Active — Signals Updated Every 15 Minutes
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            AI Stock Picks That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
              Beat the Market
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Proprietary model that identifies equities consistently outperforming the S&P 500.
            Real-time trading signals, portfolio analysis, and institutional-grade research.
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
            <Link to="/fund" className="btn-secondary text-base px-8 py-4">
              View Performance <ArrowRight size={18} />
            </Link>
          </div>

          {/* Live signal preview */}
          <div className="mt-16 text-left max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/80">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-gray-500 text-xs font-mono">live-signal</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-accent-400">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <pre className="p-5 text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto">
{`🟢 BUY SIGNAL — $NVDA
   Entry:     $142.30
   Target:    $156.80  (+10.2%)
   Stop Loss: $138.50  (-2.7%)
   Confidence: 87%

🔴 SELL SIGNAL — $SPY
   Exit at market
   Realized:  +$312  (+2.1%)`}
            </pre>
            <div className="border-t border-gray-800 px-5 py-3 bg-gray-900/50 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">30-Day Win Rate</div>
                <div className="text-lg font-bold text-accent-400">82%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Avg Trade Return</div>
                <div className="text-lg font-bold text-accent-400">+1.8%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-gray-800/60 bg-gray-900/20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['+38.2%', 'YTD Portfolio Return'],
            ['vs +24.1%', 'S&P 500 Benchmark'],
            ['82%', 'Signal Win Rate'],
            ['12,000+', 'Community Members'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold text-white mb-1">{v}</div>
              <div className="text-gray-500 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything you need to trade smarter</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Three products, one edge. Portfolio performance, live signals, and deep research.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, desc, stat, statLabel, color }) => (
              <div key={title} className="card hover:border-gray-700 transition-colors group flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center mb-5 group-hover:bg-brand-900/60 transition-colors">
                  <Icon size={22} className="text-brand-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="mt-5 pt-5 border-t border-gray-800">
                  <div className="text-2xl font-extrabold text-brand-400">{stat}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance table */}
      <section className="py-24 px-4 bg-gray-900/25">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Consistent alpha, every period</h2>
            <p className="text-gray-400 text-lg">Our portfolio versus S&P 500 across every time horizon.</p>
          </div>
          <div className="card overflow-hidden p-0">
            <div className="grid grid-cols-3 px-6 py-3 bg-gray-800/40 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Period</span>
              <span className="text-accent-400">Abdo Research</span>
              <span>S&P 500</span>
            </div>
            {PERFORMANCE.map(([period, fund, spy]) => (
              <div
                key={period}
                className="grid grid-cols-3 px-6 py-4 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors"
              >
                <span className="text-gray-400 font-medium">{period}</span>
                <span className="font-bold text-accent-400 text-lg">{fund}</span>
                <span className="text-gray-500 font-medium">{spy}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">
            Past performance does not guarantee future results.{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">Risk Disclosure</Link>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Start in 3 steps</h2>
          <p className="text-gray-400 mb-16 text-lg">Join thousands of traders already following our signals.</p>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="relative text-left">
                <div className="text-7xl font-extrabold text-gray-800/80 mb-4 leading-none">{num}</div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/abdoresearch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              <TelegramIcon /> Follow on Telegram
            </a>
            <Link to="/register" className="btn-secondary text-base px-8 py-4">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="py-24 px-4 bg-gray-900/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Why traders trust Abdo Research</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Transparent performance, real trade history, no hype.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['Full Transparency', 'Every signal is logged with entry, exit, P&L, and date. We publish the full trade history — wins and losses.'],
              ['AI-Driven Edge', 'Our model analyzes price action, volume, and macro factors to generate high-probability setups with clear risk/reward.'],
              ['Risk Management', 'Every signal includes a stop loss. Position sizing guidance included. Max drawdown kept under 10% historically.'],
              ['Daily Updates', 'Pre-market analysis and post-market reviews every trading day on Telegram and YouTube.'],
              ['Multi-Asset Coverage', 'US equities, options strategies, and select crypto setups — all in one place.'],
              ['Real Community', 'Join 12,000+ traders actively using the signals. Share results, ask questions, learn together.'],
            ].map(([title, desc]) => (
              <div key={title} className="card hover:border-gray-700 transition-colors group">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 size={18} className="text-accent-400 mt-0.5 shrink-0" />
                  <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-7">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center card border-brand-900/40 bg-gradient-to-b from-brand-950/50 to-gray-900 py-16">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to trade with an edge?</h2>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            Join 12,000+ traders already using our signals. Free to start. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/abdoresearch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              <TelegramIcon /> Join Telegram
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            By using this service you agree to our{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">Risk Disclosure</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}

import { BarChart3, TrendingUp, Target, Eye, Users, DollarSign } from 'lucide-react'

export default function Fund() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-12 px-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">Zenith Capital Fund</h1>
          <p className="text-xl text-gray-400">Professional-managed hedge fund trading equities, options, and crypto with consistent alpha generation.</p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Fund Performance</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-8 bg-gradient-to-br from-brand-900/40 to-gray-900">
              <div className="text-sm text-gray-400 mb-2">YTD Returns</div>
              <div className="text-4xl font-extrabold text-accent-400 mb-1">+38.2%</div>
              <div className="text-xs text-gray-500">vs SPY +24.1%</div>
            </div>
            <div className="card p-8 bg-gradient-to-br from-brand-900/40 to-gray-900">
              <div className="text-sm text-gray-400 mb-2">Sharpe Ratio</div>
              <div className="text-4xl font-extrabold text-brand-400 mb-1">2.1</div>
              <div className="text-xs text-gray-500">Risk-adjusted returns</div>
            </div>
            <div className="card p-8 bg-gradient-to-br from-brand-900/40 to-gray-900">
              <div className="text-sm text-gray-400 mb-2">Max Drawdown</div>
              <div className="text-4xl font-extrabold text-brand-400 mb-1">-8.3%</div>
              <div className="text-xs text-gray-500">Peak to trough loss</div>
            </div>
          </div>

          {/* Returns Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8">
              <h3 className="font-semibold text-white mb-6">Returns by Period</h3>
              <div className="space-y-4">
                {[['1 Month', '+8.7%', '+2.3%'], ['3 Month', '+22.4%', '+9.2%'], ['YTD', '+38.2%', '+24.1%'], ['1 Year', '+42.1%', '+28.5%']].map(([period, fund, spy]) => (
                  <div key={period} className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <span className="text-gray-400">{period}</span>
                    <div className="flex gap-8">
                      <span className="text-accent-400 font-semibold">{fund}</span>
                      <span className="text-gray-500">{spy}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600 mt-4">SPY benchmark included for comparison</div>
            </div>

            <div className="card p-8">
              <h3 className="font-semibold text-white mb-6">Monthly Stats</h3>
              <div className="space-y-4">
                {[['Signal Win Rate', '82%'], ['Avg Trade Return', '+1.8%'], ['Best Month', '+18.2% (Mar)'], ['Worst Month', '-5.1% (Feb)']].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fund Details */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Fund Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-brand-400" />
                Management
              </h3>
              <div className="space-y-4 text-gray-400">
                <p><span className="text-white">Assets Under Management:</span> $85M+</p>
                <p><span className="text-white">Management Fee:</span> 1.5% annually</p>
                <p><span className="text-white">Performance Fee:</span> 20% of gains</p>
                <p><span className="text-white">Minimum Investment:</span> $25,000</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target size={20} className="text-brand-400" />
                Strategy
              </h3>
              <div className="space-y-4 text-gray-400">
                <p><span className="text-white">Primary Strategy:</span> Algorithmic momentum trading</p>
                <p><span className="text-white">Assets Traded:</span> US equities, options, crypto</p>
                <p><span className="text-white">Position Hold Time:</span> Minutes to weeks</p>
                <p><span className="text-white">Target Return:</span> 30-50% annually</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Eye size={20} className="text-brand-400" />
                Transparency
              </h3>
              <div className="space-y-4 text-gray-400">
                <p><span className="text-white">Reporting:</span> Monthly performance & holdings</p>
                <p><span className="text-white">Audited:</span> Yes, by Big 4 firm</p>
                <p><span className="text-white">Risk Management:</span> 10% position limit per trade</p>
                <p><span className="text-white">Liquidity:</span> Quarterly redemptions allowed</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-brand-400" />
                Team
              </h3>
              <div className="space-y-4 text-gray-400">
                <p><span className="text-white">Founders:</span> 15+ years in quantitative finance</p>
                <p><span className="text-white">Team Size:</span> 8 engineers, 2 analysts</p>
                <p><span className="text-white">AI/ML Models:</span> 5 proprietary algorithms</p>
                <p><span className="text-white">Founded:</span> 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Invest in Zenith Capital</h2>
          <p className="text-gray-400 mb-8">Accredited investors can invest directly. All others can mirror our signals via subscription.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:investors@zenithcapital.com" className="btn-primary text-base px-8 py-3.5">
              Request Investor Deck
            </a>
            <a href="/pricing" className="btn-secondary text-base px-8 py-3.5">
              Subscribe to Signals
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react'

const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    signal: 'BUY',
    confidence: 87,
    reason: 'Strong upward momentum with support at current levels. Recent earnings beat expectations.',
    targetPrice: '$200',
    riskLevel: 'Low',
    timeframe: '3-6 months',
    portfolio: 'Growth Portfolio',
    date: '2 hours ago',
  },
  {
    id: 2,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    signal: 'SELL',
    confidence: 72,
    reason: 'Overbought conditions detected. Resistance at $280 level.',
    targetPrice: '$240',
    riskLevel: 'High',
    timeframe: '1-3 months',
    portfolio: 'Growth Portfolio',
    date: '1 hour ago',
  },
  {
    id: 3,
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    signal: 'HOLD',
    confidence: 65,
    reason: 'Consolidating near all-time highs. Monitor for breakout above $420.',
    targetPrice: '$425',
    riskLevel: 'Low',
    timeframe: '6+ months',
    portfolio: 'Growth Portfolio',
    date: '30 minutes ago',
  },
  {
    id: 4,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    signal: 'BUY',
    confidence: 79,
    reason: 'AI investments paying off. Cloud revenue accelerating.',
    targetPrice: '$160',
    riskLevel: 'Medium',
    timeframe: '6-12 months',
    portfolio: 'Conservative Portfolio',
    date: '1 hour ago',
  },
]

export default function Recommendations() {
  const getBgColor = (signal) => {
    if (signal === 'BUY') return 'bg-green-900/20'
    if (signal === 'SELL') return 'bg-red-900/20'
    return 'bg-blue-900/20'
  }

  const getTextColor = (signal) => {
    if (signal === 'BUY') return 'text-green-400'
    if (signal === 'SELL') return 'text-red-400'
    return 'text-blue-400'
  }

  const getIcon = (signal) => {
    if (signal === 'BUY') return TrendingUp
    if (signal === 'SELL') return TrendingDown
    return CheckCircle2
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">AI Recommendations</h1>
        <p className="text-gray-400">Today&apos;s buy/sell signals and portfolio rebalancing suggestions</p>
      </div>

      {/* Filter/Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm hover:border-gray-600 transition-colors">All Signals</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm hover:border-gray-600 transition-colors">🟢 Buy</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm hover:border-gray-600 transition-colors">🔴 Sell</button>
        <button className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm hover:border-gray-600 transition-colors">🔵 Hold</button>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {MOCK_RECOMMENDATIONS.map((rec) => {
          const Icon = getIcon(rec.signal)
          return (
            <div key={rec.id} className={`card ${getBgColor(rec.signal)} border-gray-800 p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getBgColor(rec.signal)}`}>
                    <Icon size={24} className={getTextColor(rec.signal)} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-mono text-brand-400">{rec.symbol}</span>
                      <h3 className="text-lg font-semibold text-white">{rec.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        rec.signal === 'BUY' ? 'bg-green-900 text-green-300' :
                        rec.signal === 'SELL' ? 'bg-red-900 text-red-300' :
                        'bg-blue-900 text-blue-300'
                      }`}>
                        {rec.signal}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{rec.name} • {rec.portfolio}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white mb-1">{rec.confidence}%</p>
                  <p className="text-xs text-gray-500">Confidence</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{rec.reason}</p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pt-4 border-t border-gray-700/50">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Target Price</p>
                  <p className="font-semibold text-white">{rec.targetPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                  <p className="font-semibold text-white">{rec.riskLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Timeframe</p>
                  <p className="font-semibold text-white">{rec.timeframe}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Updated</p>
                  <p className="font-semibold text-white">{rec.date}</p>
                </div>
                <div className="text-right">
                  <button className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

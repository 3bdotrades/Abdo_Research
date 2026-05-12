import { useState } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MOCK_HOLDINGS = [
  {
    id: 1,
    symbol: 'AAPL',
    shares: 100,
    avgCost: 150,
    currentPrice: 190,
    value: 19000,
    gainLoss: 4000,
    gainLossPercent: 26.7,
  },
  {
    id: 2,
    symbol: 'MSFT',
    shares: 50,
    avgCost: 300,
    currentPrice: 420,
    value: 21000,
    gainLoss: 6000,
    gainLossPercent: 40.0,
  },
  {
    id: 3,
    symbol: 'GOOGL',
    shares: 30,
    avgCost: 100,
    currentPrice: 140,
    value: 4200,
    gainLoss: 1200,
    gainLossPercent: 40.0,
  },
]

export default function PortfolioDetail() {
  const navigate = useNavigate()
  const [holdings, setHoldings] = useState(MOCK_HOLDINGS)
  const [showAddStock, setShowAddStock] = useState(false)
  const [newStock, setNewStock] = useState({
    symbol: '',
    shares: '',
    avgCost: '',
  })

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0)
  const totalGainLoss = holdings.reduce((sum, h) => sum + h.gainLoss, 0)
  const totalGainLossPercent = totalValue > 0 ? ((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2) : 0

  const handleAddStock = () => {
    if (newStock.symbol && newStock.shares && newStock.avgCost) {
      const cost = parseFloat(newStock.avgCost)
      const shares = parseFloat(newStock.shares)
      const stock = {
        id: holdings.length + 1,
        symbol: newStock.symbol.toUpperCase(),
        shares,
        avgCost: cost,
        currentPrice: cost * 1.1, // Mock current price
        value: shares * (cost * 1.1),
        gainLoss: shares * (cost * 1.1 - cost),
        gainLossPercent: 10,
      }
      setHoldings([...holdings, stock])
      setNewStock({ symbol: '', shares: '', avgCost: '' })
      setShowAddStock(false)
    }
  }

  const handleDeleteHolding = (id) => {
    setHoldings(holdings.filter(h => h.id !== id))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate('/dashboard/portfolios')} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
          <ArrowLeft size={20} className="text-gray-400" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-1">Growth Portfolio</h1>
          <p className="text-gray-400">Last updated 2 hours ago</p>
        </div>
        <button onClick={() => setShowAddStock(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Stock
        </button>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-gray-900 border-gray-800 p-4">
          <p className="text-sm text-gray-500 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
        </div>
        <div className="card bg-gray-900 border-gray-800 p-4">
          <p className="text-sm text-gray-500 mb-1">Total Gain/Loss</p>
          <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${totalGainLoss.toLocaleString()}
          </p>
        </div>
        <div className="card bg-gray-900 border-gray-800 p-4">
          <p className="text-sm text-gray-500 mb-1">Return %</p>
          <p className={`text-2xl font-bold ${totalGainLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalGainLossPercent}%
          </p>
        </div>
        <div className="card bg-gray-900 border-gray-800 p-4">
          <p className="text-sm text-gray-500 mb-1">Holdings</p>
          <p className="text-2xl font-bold text-white">{holdings.length}</p>
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddStock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card bg-gray-900 border-gray-800 p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Add Stock to Portfolio</h2>
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Stock Symbol (e.g., AAPL)"
                value={newStock.symbol}
                onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-600"
              />
              <input
                type="number"
                placeholder="Number of Shares"
                value={newStock.shares}
                onChange={(e) => setNewStock({ ...newStock, shares: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-600"
              />
              <input
                type="number"
                placeholder="Average Cost per Share"
                value={newStock.avgCost}
                onChange={(e) => setNewStock({ ...newStock, avgCost: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-600"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowAddStock(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleAddStock} className="btn-primary flex-1">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Holdings Table */}
      <div className="card bg-gray-900 border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400">Symbol</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400">Shares</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400">Avg Cost</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400">Price</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400">Value</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400">Gain/Loss</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400">Return %</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {holdings.map((holding) => (
                <tr key={holding.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-white">{holding.symbol}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 text-right">{holding.shares}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 text-right">${holding.avgCost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 text-right">${holding.currentPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white text-right">${holding.value.toLocaleString()}</td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right ${holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {holding.gainLoss >= 0 ? '+' : ''}${holding.gainLoss.toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right flex items-center justify-end gap-1 ${holding.gainLossPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {holding.gainLossPercent >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {holding.gainLossPercent}%
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteHolding(holding.id)}
                      className="p-2 rounded-lg hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-blue-900/20 border-blue-800/40 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Recommendation</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-lg bg-blue-900/60 text-blue-300 text-sm font-bold">REBALANCE</span>
            <span className="text-gray-400">Confidence: 78%</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your portfolio is heavily weighted towards MSFT (50%). Consider adding more defensive positions to reduce concentration risk.
          </p>
        </div>

        <div className="card bg-gray-900 border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Risk Analysis</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Portfolio Beta</span>
              <span className="text-white font-semibold">1.2</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Volatility (Annual)</span>
              <span className="text-white font-semibold">24.3%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Sharpe Ratio</span>
              <span className="text-white font-semibold">1.8</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Risk Level</span>
              <span className="text-white font-semibold">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

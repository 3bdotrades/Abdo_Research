import { useState } from 'react'
import { Plus, TrendingUp, Trash2, Edit2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MOCK_PORTFOLIOS = [
  {
    id: 1,
    name: 'Growth Portfolio',
    totalValue: 44200,
    gainLoss: 2840,
    gainLossPercent: 6.8,
    lastUpdated: '2 hours ago',
    holdings: 3,
    recommendation: 'REBALANCE',
    riskLevel: 'Medium',
  },
  {
    id: 2,
    name: 'Conservative Portfolio',
    totalValue: 28500,
    gainLoss: 850,
    gainLossPercent: 3.1,
    lastUpdated: '1 hour ago',
    holdings: 5,
    recommendation: 'HOLD',
    riskLevel: 'Low',
  },
]

export default function Portfolios() {
  const navigate = useNavigate()
  const [portfolios, setPortfolios] = useState(MOCK_PORTFOLIOS)
  const [showCreate, setShowCreate] = useState(false)
  const [newPortfolioName, setNewPortfolioName] = useState('')

  const handleCreatePortfolio = () => {
    if (newPortfolioName.trim()) {
      const newPortfolio = {
        id: portfolios.length + 1,
        name: newPortfolioName,
        totalValue: 0,
        gainLoss: 0,
        gainLossPercent: 0,
        lastUpdated: 'Just now',
        holdings: 0,
        recommendation: 'ADD_STOCKS',
        riskLevel: 'N/A',
      }
      setPortfolios([...portfolios, newPortfolio])
      setNewPortfolioName('')
      setShowCreate(false)
    }
  }

  const handleDeletePortfolio = (id) => {
    setPortfolios(portfolios.filter(p => p.id !== id))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Your Portfolios</h1>
          <p className="text-gray-400">Manage and track your stock portfolios with AI recommendations</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          New Portfolio
        </button>
      </div>

      {/* Create Portfolio Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card bg-gray-900 border-gray-800 p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold text-white mb-4">Create New Portfolio</h2>
            <input
              type="text"
              placeholder="Portfolio name (e.g. Growth Portfolio)"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-600 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleCreatePortfolio()}
            />
            <div className="flex gap-3">
              <button onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleCreatePortfolio} className="btn-primary flex-1">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolios Grid */}
      {portfolios.length === 0 ? (
        <div className="text-center py-16 card bg-gray-900/30 border-gray-800">
          <TrendingUp size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No portfolios yet</h3>
          <p className="text-gray-400 mb-6">Create your first portfolio to start tracking stocks and getting AI recommendations</p>
          <button onClick={() => setShowCreate(true)} className="btn-primary mx-auto">
            Create Your First Portfolio
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="card bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/portfolios/${portfolio.id}`)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{portfolio.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      portfolio.recommendation === 'BUY' ? 'bg-green-900/40 text-green-300' :
                      portfolio.recommendation === 'SELL' ? 'bg-red-900/40 text-red-300' :
                      portfolio.recommendation === 'REBALANCE' ? 'bg-blue-900/40 text-blue-300' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                      {portfolio.recommendation}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Value</p>
                      <p className="text-xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Gain/Loss</p>
                      <p className={`text-xl font-bold ${portfolio.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {portfolio.gainLoss >= 0 ? '+' : ''}{portfolio.gainLoss} ({portfolio.gainLossPercent}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Holdings</p>
                      <p className="text-xl font-bold text-white">{portfolio.holdings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                      <p className="text-xl font-bold text-white">{portfolio.riskLevel}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">Updated {portfolio.lastUpdated}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletePortfolio(portfolio.id)}
                    className="p-2 rounded-lg hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

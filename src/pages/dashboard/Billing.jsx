import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Zap, Building2, ExternalLink, User } from 'lucide-react'
import api from '../../utils/api'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

const PLANS = [
  {
    id: 'free', name: 'Free', icon: User, price: '$0/mo',
    features: ['100 calls/month', 'Default model', 'Community support'],
  },
  {
    id: 'pro', name: 'Pro', icon: Zap, price: '$49/mo',
    features: ['10,000 calls/month', 'Advanced model', 'Email support', 'Priority queue'],
    highlight: true,
  },
  {
    id: 'enterprise', name: 'Enterprise', icon: Building2, price: 'Custom',
    features: ['1M+ calls/month', 'All models', 'Dedicated support', 'Custom SLA'],
  },
]

export default function Billing() {
  const user = useAuthStore((s) => s.user)
  const currentPlan = user?.plan || 'free'

  const handleUpgrade = async (plan) => {
    if (plan === 'enterprise') {
      window.location.href = 'mailto:enterprise@abdoresearch.com?subject=Enterprise Plan Inquiry'
      return
    }
    try {
      const { data } = await api.get(`/billing/checkout/${plan}`)
      window.location.href = data.url
    } catch {
      toast.error('Could not start checkout. Please try again.')
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Billing & Plan</h1>
        <p className="text-gray-500 text-sm">Manage your subscription. Payments via Whop — supports Apple Pay, Google Pay, and card.</p>
      </div>

      {/* Current plan banner */}
      <div className="card border-brand-800/50 bg-brand-950/30 mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400 mb-0.5">Current plan</p>
          <p className="text-xl font-bold text-white capitalize">{currentPlan}</p>
        </div>
        {currentPlan !== 'free' && (
          <button
            onClick={async () => {
              try {
                const { data } = await api.post('/billing/portal')
                window.open(data.url, '_blank')
              } catch {
                toast.error('Could not open billing portal')
              }
            }}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            Manage subscription <ExternalLink size={14} />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const Icon = plan.icon
          const isCurrent = plan.id === currentPlan
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 border flex flex-col ${
                plan.highlight
                  ? 'bg-gradient-to-b from-brand-900/50 to-gray-900 border-brand-700'
                  : 'bg-gray-900 border-gray-800'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-green-600 text-white text-xs font-bold">
                  Current
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} className={plan.highlight ? 'text-brand-400' : 'text-gray-400'} />
                <span className="font-semibold text-white">{plan.name}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-4">{plan.price}</div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle2 size={13} className="text-brand-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <div className="btn-secondary w-full opacity-60 cursor-default text-center text-sm">Active plan</div>
              ) : plan.id === 'free' ? (
                <div className="text-xs text-gray-600 text-center">Downgrade not available — contact support</div>
              ) : (
                <button onClick={() => handleUpgrade(plan.id)} className={`${plan.highlight ? 'btn-primary' : 'btn-outline'} w-full`}>
                  {plan.id === 'enterprise' ? 'Contact us' : 'Upgrade with Apple Pay'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-gray-900 border border-gray-800">
        <p className="text-xs text-gray-500 leading-relaxed">
          Subscriptions are managed through <strong className="text-gray-400">Whop</strong>, which supports Apple Pay, Google Pay, and major credit cards.
          By subscribing you agree to our <a href="/risk-disclosure" className="text-brand-400 hover:underline">Risk Disclosure</a>.
          Cancellations take effect at the end of the billing cycle.
        </p>
      </div>
    </div>
  )
}

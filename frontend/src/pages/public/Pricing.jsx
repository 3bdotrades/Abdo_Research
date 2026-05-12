import { Link } from 'react-router-dom'
import { CheckCircle2, Zap, Building2, User } from 'lucide-react'

const PLANS = [
  {
    name: 'Basic',
    icon: User,
    price: '$0',
    period: '/month',
    desc: 'Perfect for getting started with portfolio tracking.',
    badge: null,
    features: [
      'Unlimited portfolio creation',
      'Manual stock entry',
      'Basic portfolio tracking',
      'Weekly AI recommendations',
      'Email support',
      'No credit card required',
    ],
    cta: 'Get started free',
    ctaTo: '/register',
    ctaClass: 'btn-secondary',
    highlight: false,
  },
  {
    name: 'Pro',
    icon: Zap,
    price: '$9',
    period: '/month',
    desc: 'For serious investors who want daily AI insights.',
    badge: 'Most Popular',
    features: [
      'Everything in Basic, plus:',
      'Daily AI recommendations',
      'Buy/Sell signal analysis',
      'Portfolio rebalancing advice',
      'Risk assessment reports',
      'Performance analytics',
      'Priority email support',
    ],
    cta: 'Subscribe now',
    ctaTo: null,
    ctaClass: 'btn-primary',
    highlight: true,
    whopPlan: 'pro',
  },
  {
    name: 'Enterprise',
    icon: Building2,
    price: '$29',
    period: '/month',
    desc: 'For professional traders and advisors managing multiple portfolios.',
    badge: null,
    features: [
      'Everything in Pro, plus:',
      'Real-time AI recommendations',
      'Multiple portfolio management',
      'Advanced risk modeling',
      'Custom ML model training',
      'Dedicated account manager',
      'Phone & Slack support',
      'Custom integrations',
    ],
    cta: 'Subscribe now',
    ctaTo: null,
    ctaClass: 'btn-primary',
    highlight: false,
    whopPlan: 'enterprise',
  },
]

export default function Pricing() {
  const handleWhopCheckout = (plan) => {
    const urls = {
      pro: 'https://whop.com/checkout/your-pro-plan',
      enterprise: 'https://whop.com/checkout/your-enterprise-plan',
    }
    window.location.href = urls[plan]
  }

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Invest in knowledge</h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            Get AI-powered insights at every investment level. Start free, upgrade when you&apos;re ready.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Payments processed securely. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-brand-900/60 to-gray-900 border-brand-600 shadow-xl shadow-brand-900/40'
                    : 'bg-gray-900 border-gray-800'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plan.highlight ? 'bg-brand-600' : 'bg-gray-800'}`}>
                    <Icon size={18} className={plan.highlight ? 'text-white' : 'text-gray-400'} />
                  </div>
                  <h2 className="text-xl font-bold text-white">{plan.name}</h2>
                </div>

                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-brand-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.whopPlan ? (
                  <button onClick={() => handleWhopCheckout(plan.whopPlan)} className={`${plan.ctaClass} w-full`}>
                    {plan.cta}
                  </button>
                ) : plan.ctaTo ? (
                  <Link to={plan.ctaTo} className={`${plan.ctaClass} w-full`}>{plan.cta}</Link>
                ) : (
                  <a href="mailto:contact@abdoresearch.com" className={`${plan.ctaClass} w-full`}>{plan.cta}</a>
                )}
              </div>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              ['Can I change plans?', 'Yes. You can upgrade or downgrade at any time from your account settings. Changes take effect immediately.'],
              ['What if I cancel my subscription?', 'You can cancel anytime with one click. You&apos;ll retain access to your portfolio data and can reactivate later.'],
              ['Do you offer a trial of Pro?', 'The free Basic plan lets you evaluate all features with limited recommendation frequency. Upgrade to Pro to get daily insights.'],
              ['How are AI recommendations generated?', 'Our ML models analyze stock performance, market trends, and your portfolio composition to generate personalized recommendations.'],
              ['Can I export my portfolio data?', 'Yes. You can export your portfolio and recommendation history as CSV at any time from your dashboard.'],
            ].map(([q, a]) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-12">
          Understand the limitations of AI-driven investing. Review our{' '}
          <Link to="/risk-disclosure" className="text-brand-400 hover:underline">Risk Disclosure</Link>.
        </p>
      </div>
    </div>
  )
}

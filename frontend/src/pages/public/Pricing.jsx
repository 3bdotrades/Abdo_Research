import { Link } from 'react-router-dom'
import { CheckCircle2, Zap, Building2, User } from 'lucide-react'

const PLANS = [
  {
    name: 'Free',
    icon: User,
    price: '$0',
    period: '/month',
    desc: 'Perfect for experimentation and prototyping.',
    badge: null,
    features: [
      '100 API calls / month',
      'Default model access',
      'REST API access',
      'API key management',
      'Community support',
    ],
    cta: 'Get started free',
    ctaTo: '/register',
    ctaClass: 'btn-secondary',
    highlight: false,
  },
  {
    name: 'Pro',
    icon: Zap,
    price: '$49',
    period: '/month',
    desc: 'For developers and growing teams who need scale.',
    badge: 'Most Popular',
    features: [
      '10,000 API calls / month',
      'Default + Advanced models',
      'Priority response queue',
      'Usage analytics dashboard',
      'API key management (5 keys)',
      'Email support',
    ],
    cta: 'Subscribe with Apple Pay',
    ctaTo: null,
    ctaClass: 'btn-primary',
    highlight: true,
    whopPlan: 'pro',
  },
  {
    name: 'Enterprise',
    icon: Building2,
    price: 'Custom',
    period: '',
    desc: 'Dedicated infrastructure for large-scale deployments.',
    badge: null,
    features: [
      '1,000,000+ API calls / month',
      'All models + Custom fine-tuning',
      'Dedicated compute',
      'SLA uptime guarantee',
      'Unlimited API keys',
      'Slack + dedicated support',
      'Custom contract & invoicing',
    ],
    cta: 'Contact us',
    ctaTo: null,
    ctaClass: 'btn-outline',
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
          <h1 className="text-5xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            Start free. Scale when you need to. No hidden fees.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Payments powered by Whop — supports Apple Pay, card &amp; more.
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
              ['Can I change plans?', 'Yes. You can upgrade or downgrade at any time from your Whop billing portal. Changes take effect immediately.'],
              ['What happens if I exceed my quota?', 'API calls return a 429 error once your monthly limit is reached. Upgrade your plan to continue.'],
              ['Do you offer a trial of Pro?', 'The Free plan lets you evaluate the API before committing. There is no time-limited trial of Pro.'],
              ['How does Apple Pay work?', 'Checkout is handled by Whop, which supports Apple Pay, Google Pay, and major credit cards. We never see your payment details.'],
              ['What are the model limitations?', 'Please review our Risk Disclosure for information about model limitations and appropriate use cases.'],
            ].map(([q, a]) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-12">
          By subscribing you acknowledge our{' '}
          <Link to="/risk-disclosure" className="text-brand-400 hover:underline">Risk Disclosure</Link>.
        </p>
      </div>
    </div>
  )
}

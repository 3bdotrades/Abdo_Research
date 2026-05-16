import { Link } from 'react-router-dom'
import { CheckCircle2, Zap, Building2, User } from 'lucide-react'

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const PLANS = [
  {
    name: 'Basic',
    icon: User,
    price: '$0',
    period: '/month',
    desc: 'Perfect for traders exploring our signals.',
    badge: null,
    features: [
      'Signal preview (24h delayed)',
      '2 free research reports/month',
      'Portfolio performance tracking',
      'Weekly market newsletter',
      'YouTube research access',
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
    price: '$99',
    period: '/month',
    desc: 'For active traders who need real-time signals.',
    badge: 'Most Popular',
    features: [
      'Everything in Basic, plus:',
      'Real-time trading signals (live)',
      'Telegram alerts — instant delivery',
      'Unlimited research reports',
      'Premium sector analysis',
      'Signal history & analytics',
      'Priority email support',
      'Signal backtesting data',
    ],
    cta: 'Subscribe now',
    ctaClass: 'btn-primary',
    highlight: true,
    whopPlan: 'pro',
  },
  {
    name: 'VIP+',
    icon: Building2,
    price: '$299',
    period: '/month',
    desc: 'For professional traders and fund managers.',
    badge: null,
    features: [
      'Everything in Pro, plus:',
      'Advanced signal filtering',
      'Custom strategy templates',
      'Exclusive research & trade ideas',
      'Direct analyst access (Slack)',
      'Private monthly strategy calls',
      'API access for integration',
      'Dedicated account manager',
    ],
    cta: 'Subscribe now',
    ctaClass: 'btn-primary',
    highlight: false,
    whopPlan: 'vip',
  },
]

export default function Pricing() {
  const handleCheckout = (plan) => {
    const urls = {
      pro: 'https://whop.com/checkout/abdo-research-pro',
      vip: 'https://whop.com/checkout/abdo-research-vip',
    }
    window.location.href = urls[plan]
  }

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            Get professional trading signals and market research. Choose the plan that fits your trading style.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Secure payments via Whop. Cancel anytime. 30-day money-back guarantee on Pro &amp; VIP+.
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
                    ? 'bg-gradient-to-b from-brand-950/60 to-gray-900 border-brand-700/60 shadow-xl shadow-brand-950/40'
                    : 'bg-gray-900 border-gray-800'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.highlight ? 'bg-brand-600' : 'bg-gray-800'
                  }`}>
                    <Icon size={19} className={plan.highlight ? 'text-white' : 'text-gray-400'} />
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
                      <CheckCircle2 size={15} className="text-brand-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.whopPlan ? (
                  <button
                    onClick={() => handleCheckout(plan.whopPlan)}
                    className={`${plan.ctaClass} w-full`}
                  >
                    {plan.cta}
                  </button>
                ) : plan.ctaTo ? (
                  <Link to={plan.ctaTo} className={`${plan.ctaClass} w-full`}>
                    {plan.cta}
                  </Link>
                ) : (
                  <a href="mailto:contact@abdoresearch.com" className={`${plan.ctaClass} w-full`}>
                    {plan.cta}
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/* Telegram note */}
        <div className="mt-10 max-w-5xl mx-auto text-center card border-brand-900/30 bg-brand-950/20 py-6">
          <p className="text-gray-300 text-sm">
            Already a subscriber?{' '}
            <a
              href="https://t.me/abdoresearch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline inline-flex items-center gap-1"
            >
              <TelegramIcon /> Join our Telegram channel
            </a>{' '}
            to get signals and access the community.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              ['Can I cancel anytime?', 'Yes. Cancel with one click from your account. No lock-in. Pro & VIP+ include a 30-day money-back guarantee.'],
              ['How are signals delivered?', 'Real-time via Telegram push notification and on your Pro dashboard. Each signal includes entry, target, stop loss, and confidence score.'],
              ['Is there a free trial?', 'Yes — the Basic plan is free forever. You get delayed signal previews and 2 research reports/month to evaluate the quality before upgrading.'],
              ['How are signals generated?', 'Our proprietary AI model analyzes price action, volume, momentum, and macro factors. Each signal is scored for confidence and includes full trade context.'],
              ['Can I track my performance?', 'Yes. Your Pro/VIP+ dashboard shows full signal history, win rate, P&L analysis, and comparison against our portfolio returns.'],
              ['What markets do you cover?', 'US equities, options strategies, and select crypto setups. All asset classes covered in the same channel and dashboard.'],
            ].map(([q, a]) => (
              <div key={q} className="card">
                <h3 className="font-semibold text-white mb-2">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-12">
          Trading involves risk. Review our{' '}
          <Link to="/risk-disclosure" className="text-brand-500 hover:underline">Risk Disclosure</Link> before subscribing.
        </p>
      </div>
    </div>
  )
}

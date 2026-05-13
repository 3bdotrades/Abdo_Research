import { Link } from 'react-router-dom'
import { CheckCircle2, Zap, Building2, User } from 'lucide-react'

const PLANS = [
  {
    name: 'Basic',
    icon: User,
    price: '$0',
    period: '/month',
    desc: 'Perfect for traders just getting started.',
    badge: null,
    features: [
      'Preview trading signals (delayed 24h)',
      '2 free research reports/month',
      'Fund performance tracking',
      'Weekly market newsletter',
      'Community forum access',
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
    desc: 'For active day traders who need real-time signals.',
    badge: 'Most Popular',
    features: [
      'Everything in Basic, plus:',
      'Real-time trading signals (live)',
      'Signal alerts via email, SMS, dashboard',
      'Unlimited research reports access',
      'Premium sector analysis reports',
      'Signal performance tracking & analytics',
      'Priority email support',
      'Signal history & backtesting',
    ],
    cta: 'Subscribe now',
    ctaTo: null,
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
      'Advanced signal analytics & filtering',
      'Custom strategy templates',
      'Exclusive research & trade ideas',
      'Direct access to analyst team (Slack)',
      'Private monthly strategy sessions',
      'API access for signal integration',
      'Institutional-grade reporting',
      'Dedicated account manager',
    ],
    cta: 'Subscribe now',
    ctaTo: null,
    ctaClass: 'btn-primary',
    highlight: false,
    whopPlan: 'vip',
  },
]

export default function Pricing() {
  const handleWhopCheckout = (plan) => {
    const urls = {
      pro: 'https://whop.com/checkout/zenith-capital-pro',
      vip: 'https://whop.com/checkout/zenith-capital-vip',
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
            Secure payments via Whop. Cancel anytime. 30-day money-back guarantee on Pro & VIP+.
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
              ['Can I change plans?', 'Yes. Upgrade or downgrade anytime from your account settings. Changes take effect immediately.'],
              ['What if I cancel?', 'You can cancel with one click, anytime. Pro & VIP+ include a 30-day money-back guarantee if you&apos;re not satisfied.'],
              ['Do you offer a trial?', 'Yes! Start with the free Basic plan. You get access to delayed signals (24h delay) and 2 free research reports to test the platform.'],
              ['How are signals generated?', 'Our proprietary algorithms analyze price action, technical indicators, volume, and market sentiment. Signals are rated by confidence level.'],
              ['Can I track my trading performance?', 'Yes. Your Pro/VIP+ dashboard includes signal history, win rate tracking, P&L analysis, and comparison to our fund performance.'],
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

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
    name: 'أساسي',
    nameEn: 'Basic',
    icon: User,
    price: '$0',
    period: '/شهر',
    desc: 'مثالي للمتداولين الجدد اللي يريدون يجربون الإشارات.',
    badge: null,
    features: [
      'معاينة الإشارات (متأخر 24 ساعة)',
      'تقريران مجانيان شهرياً',
      'متابعة أداء المحفظة',
      'النشرة الأسبوعية للسوق',
      'وصول يوتيوب مجاني',
      'بدون بطاقة ائتمان',
    ],
    cta: 'ابدأ مجاناً',
    ctaTo: '/register',
    ctaClass: 'btn-secondary',
    highlight: false,
  },
  {
    name: 'احترافي',
    nameEn: 'Pro',
    icon: Zap,
    price: '$99',
    period: '/شهر',
    desc: 'للمتداولين النشطين اللي يريدون إشارات مباشرة.',
    badge: 'الأكثر طلباً',
    features: [
      'كل ما في الأساسي، بالإضافة إلى:',
      'إشارات تداول مباشرة (فورية)',
      'تنبيهات فورية على تيليجرام',
      'وصول غير محدود لتقارير البحث',
      'تقارير قطاعية متميزة',
      'سجل الإشارات والتحليلات',
      'دعم بريد إلكتروني مميز',
      'بيانات الاختبار التاريخي',
    ],
    cta: 'اشترك الآن',
    ctaClass: 'btn-primary',
    highlight: true,
    whopPlan: 'pro',
  },
  {
    name: 'VIP+',
    nameEn: 'VIP+',
    icon: Building2,
    price: '$299',
    period: '/شهر',
    desc: 'للمتداولين المحترفين ومديري المحافظ.',
    badge: null,
    features: [
      'كل ما في الاحترافي، بالإضافة إلى:',
      'فلترة متقدمة للإشارات',
      'قوالب استراتيجيات مخصصة',
      'بحوث وأفكار تداول حصرية',
      'وصول مباشر لفريق التحليل (Slack)',
      'جلسات استراتيجية شهرية خاصة',
      'وصول API للتكامل',
      'مدير حساب مخصص',
    ],
    cta: 'اشترك الآن',
    ctaClass: 'btn-primary',
    highlight: false,
    whopPlan: 'vip',
  },
]

const FAQ = [
  ['هل يمكنني الإلغاء في أي وقت؟', 'نعم. إلغاء بنقرة واحدة في أي وقت. بدون أي ترابط. الباقات الاحترافية تشمل ضمان استرداد المال خلال 30 يوماً.'],
  ['كيف تصلني الإشارات؟', 'فور صدور الإشارة تصلك على تيليجرام مباشرة. كل إشارة فيها سعر الدخول والهدف ووقف الخسارة ونسبة الثقة.'],
  ['هل فيه تجربة مجانية؟', 'نعم — الباقة الأساسية مجانية للأبد. تحصل على معاينة الإشارات المتأخرة (24 ساعة) وتقريرين شهرياً لتقييم الجودة قبل الترقية.'],
  ['كيف تُولَّد الإشارات؟', 'موديل ذكاء اصطناعي يحلل حركة الأسعار والحجم والزخم والعوامل الاقتصادية. كل إشارة مصنفة حسب درجة الثقة مع سياق السوق الكامل.'],
  ['هل يمكنني تتبع أدائي؟', 'نعم. لوحة التحكم تشمل سجل الإشارات الكامل وتتبع نسبة النجاح وتحليل الأرباح والخسائر ومقارنة بأداء محفظتنا.'],
  ['ما الأسواق التي تغطونها؟', 'أسهم أمريكية، استراتيجيات أوبشنز، وكريبتو مختار. كل الفئات في نفس القناة ولوحة التحكم.'],
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
          <h1 className="text-5xl font-bold text-white mb-4">أسعار واضحة وشفافة</h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            إشارات تداول احترافية وبحوث السوق. اختر الباقة المناسبة لأسلوبك في التداول.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            دفع آمن عبر Whop. إلغاء في أي وقت. ضمان استرداد المال 30 يوماً.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => {
            const Icon = plan.icon
            return (
              <div key={plan.name}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-brand-950/60 to-gray-900 border-brand-700/60 shadow-xl shadow-brand-950/40'
                    : 'bg-gray-900 border-gray-800'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-lg">{plan.badge}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-brand-600' : 'bg-gray-800'}`}>
                    <Icon size={19} className={plan.highlight ? 'text-white' : 'text-gray-400'} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{plan.name}</h2>
                    <span className="text-xs text-gray-500">{plan.nameEn}</span>
                  </div>
                </div>
                <div className="mb-2" style={{ direction: 'ltr', textAlign: 'right' }}>
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
                  <button onClick={() => handleCheckout(plan.whopPlan)} className={`${plan.ctaClass} w-full`}>{plan.cta}</button>
                ) : plan.ctaTo ? (
                  <Link to={plan.ctaTo} className={`${plan.ctaClass} w-full`}>{plan.cta}</Link>
                ) : (
                  <a href="mailto:contact@abdoresearch.com" className={`${plan.ctaClass} w-full`}>{plan.cta}</a>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-10 max-w-5xl mx-auto text-center card border-brand-900/30 bg-brand-950/20 py-6">
          <p className="text-gray-300 text-sm">
            مشترك بالفعل؟{' '}
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="text-brand-400 hover:underline inline-flex items-center gap-1">
              <TelegramIcon /> انضم لقناتنا على تيليجرام
            </a>{' '}
            للحصول على الإشارات والوصول للمجتمع.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">أسئلة شائعة</h2>
          <div className="space-y-4">
            {FAQ.map(([q, a]) => (
              <div key={q} className="card">
                <h3 className="font-bold text-white mb-2">{q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-12">
          التداول ينطوي على مخاطر. راجع{' '}
          <Link to="/risk-disclosure" className="text-brand-500 hover:underline">إفصاح المخاطر</Link>{' '}
          قبل الاشتراك.
        </p>
      </div>
    </div>
  )
}

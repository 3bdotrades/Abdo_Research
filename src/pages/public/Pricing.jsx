import { Link } from 'react-router-dom'
import { CheckCircle2, Zap, Building2, User, AlertTriangle } from 'lucide-react'

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const PLANS = [
  {
    name: 'مجاني',
    nameEn: 'Free',
    icon: User,
    price: '$0',
    period: '/شهر',
    desc: 'ابدأ من هنا. لا بطاقة ائتمان. جرّب وحكم بنفسك.',
    badge: null,
    features: [
      'كل فيديوهات يوتيوب — مجاناً للأبد',
      'معاينة أفكار التداول (متأخر 24 ساعة)',
      'تقريران بحثيان شهرياً',
      'النشرة الأسبوعية للسوق',
      'مجتمع تيليجرام — للنقاش والتعلم',
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
    desc: 'للمتداولين الجادين اللي يريدون التفاصيل الكاملة لكل فكرة تداول.',
    badge: 'الأكثر طلباً',
    features: [
      'كل ما في المجاني، بالإضافة إلى:',
      'أفكار التداول فورية (بدون تأخير)',
      'السبب التحليلي الكامل لكل فكرة',
      'وصول غير محدود لتقارير البحث',
      'تحليلات قطاعية متعمقة',
      'سجل كامل لجميع الأفكار السابقة',
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
    desc: 'للمتداولين المتقدمين الذين يريدون وصولاً مباشراً لفريق التحليل.',
    badge: null,
    features: [
      'كل ما في الاحترافي، بالإضافة إلى:',
      'وصول مباشر لفريق التحليل',
      'جلسات نقاش شهرية خاصة',
      'أفكار تداول مخصصة حسب طلبك',
      'أرشيف كامل لجميع التقارير',
      'وصول API للبيانات والتكامل',
    ],
    cta: 'تواصل معنا',
    ctaClass: 'btn-primary',
    highlight: false,
    whopPlan: 'vip',
  },
]

const FAQ = [
  ['هل يمكنني الإلغاء في أي وقت؟', 'نعم. إلغاء بنقرة واحدة في أي وقت بدون أي ترابط أو رسوم إضافية.'],
  ['ما الفرق بين المجاني والاحترافي؟', 'المجاني يعطيك أفكار التداول بتأخير 24 ساعة. الاحترافي يعطيك الأفكار فورياً مع السياق التحليلي الكامل والوصول لجميع التقارير.'],
  ['هل هذه توصيات استثمارية؟', 'لا. هذا تحليل شخصي لأغراض تعليمية ومتابعة السوق. القرار النهائي دائماً لك. لا نتحمل أي مسؤولية عن نتائج تداولك.'],
  ['كيف تعمل أفكار التداول؟', 'كل فكرة تتضمن: الرمز، الاتجاه، سعر الدخول المقترح، الهدف، وقف الخسارة، ونسبة الثقة — مع شرح السبب التحليلي الكامل.'],
  ['ماذا لو خسرت؟', 'الخسارة ممكنة وحقيقية. نظهر الصفقات الخاسرة بنفس وضوح الرابحة. لا تستثمر مالاً لا تتحمل خسارته.'],
  ['هل الباقة المجانية كافية للبدء؟', 'نعم. ابدأ بيوتيوب والمجاني واحكم بنفسك على جودة التحليل قبل أي قرار اشتراك.'],
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
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">الباقات</h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            ابدأ بالمجاني. ترقّ فقط إذا وجدت أن التحليل يضيف لك قيمة حقيقية.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-right">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-200/70 text-sm leading-relaxed">
              الاشتراك يتيح لك الوصول لتحليل شخصي وأفكار تداول — ليس نصيحة استثمارية مرخصة.
              التداول ينطوي على مخاطر خسارة رأس المال. لا نضمن أي عوائد.{' '}
              <Link to="/risk-disclosure" className="underline hover:text-amber-200">إفصاح المخاطر الكامل</Link>
            </p>
          </div>
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

        {/* Free path banner */}
        <div className="mt-10 max-w-5xl mx-auto text-center card border-gray-700/40 bg-gray-900/60 py-6 px-8">
          <p className="text-gray-300 text-sm mb-3 font-semibold">لست متأكداً؟ ابدأ بالمجاني تماماً</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:underline">
              <YoutubeIcon /> يوتيوب — مجاناً للأبد
            </a>
            <span className="text-gray-700">|</span>
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:underline">
              <TelegramIcon /> تيليجرام — مجاناً
            </a>
          </div>
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
          <Link to="/risk-disclosure" className="text-brand-500 hover:underline">إفصاح المخاطر الكامل</Link>{' '}
          قبل الاشتراك.
        </p>
      </div>
    </div>
  )
}

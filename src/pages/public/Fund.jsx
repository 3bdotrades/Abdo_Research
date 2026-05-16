import { Link } from 'react-router-dom'
import { BarChart3, Target, ShieldCheck, Users, AlertTriangle } from 'lucide-react'

function YoutubeIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const PERFORMANCE = [
  ['شهر واحد',         '+8.7%',            '+2.3%'],
  ['3 أشهر',           '+22.4%',           '+9.2%'],
  ['من بداية العام',   '+38.2%',           '+24.1%'],
  ['سنة كاملة',        '+42.1%',           '+28.5%'],
]

const MONTHLY = [
  ['يناير',   '+11.4%', 'text-accent-400'],
  ['فبراير',  '-5.1%',  'text-red-400'],
  ['مارس',    '+18.2%', 'text-accent-400'],
  ['أبريل',   '+6.3%',  'text-accent-400'],
  ['مايو',    '+7.4%',  'text-accent-400'],
]

export default function Fund() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-10 px-4 border-b border-gray-800/80">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">المحفظة التتبعية</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            محفظة حقيقية نتابعها لاختبار الموديل — المكاسب والخسائر كلها منشورة.
            هذا ليس صندوق استثمار ولا وعد بأي عائد.
          </p>
        </div>
      </section>

      {/* Big disclaimer */}
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-right">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-200 font-semibold text-sm mb-1">تنبيه مهم</p>
              <p className="text-amber-200/70 text-sm leading-relaxed">
                النتائج المعروضة هي نتائج محفظة تتبعية لاختبار الموديل — ليست محفظة مُدارة ولا توصية استثمارية.
                الأداء السابق لا يضمن نتائج مستقبلية. التداول ينطوي على مخاطر خسارة رأس المال كله أو جزء منه.
                لا تستثمر مالاً لا تتحمل خسارته.{' '}
                <Link to="/risk-disclosure" className="underline hover:text-amber-200">إفصاح المخاطر الكامل</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="card p-8 bg-gradient-to-br from-brand-950/50 to-gray-900 border-brand-900/40">
              <div className="text-sm text-gray-400 mb-2">عائد هذا العام (تتبعي)</div>
              <div className="text-5xl font-extrabold text-accent-400 mb-2" style={{ direction: 'ltr', textAlign: 'right' }}>+38.2%</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded" style={{ direction: 'ltr' }}>S&P 500: +24.1%</span>
              </div>
            </div>
            <div className="card p-8">
              <div className="text-sm text-gray-400 mb-2">أسوأ شهر</div>
              <div className="text-5xl font-extrabold text-red-400 mb-2" style={{ direction: 'ltr', textAlign: 'right' }}>-5.1%</div>
              <div className="text-xs text-gray-500">فبراير — نشرنا هذا علناً مثل أي شهر آخر</div>
            </div>
            <div className="card p-8">
              <div className="text-sm text-gray-400 mb-2">الحد الأقصى للخسارة</div>
              <div className="text-5xl font-extrabold text-white mb-2" style={{ direction: 'ltr', textAlign: 'right' }}>-8.3%</div>
              <div className="text-xs text-gray-500">أقصى خسارة من القمة للقاع — تاريخياً</div>
            </div>
          </div>

          {/* Returns table + Monthly breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-bold text-white text-lg">مقابل <span style={{ direction: 'ltr', display: 'inline-block' }}>S&P 500</span></h3>
              </div>
              <div className="grid grid-cols-3 px-6 py-3 bg-gray-800/30 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>الفترة</span>
                <span className="text-accent-400 text-center">الموديل</span>
                <span className="text-center" style={{ direction: 'ltr' }}>S&P 500</span>
              </div>
              {PERFORMANCE.map(([period, fund, spy]) => (
                <div key={period} className="grid grid-cols-3 px-6 py-4 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors items-center">
                  <span className="text-gray-400">{period}</span>
                  <span className="font-bold text-accent-400 text-center" style={{ direction: 'ltr' }}>{fund}</span>
                  <span className="text-gray-500 text-center" style={{ direction: 'ltr' }}>{spy}</span>
                </div>
              ))}
            </div>

            <div className="card p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-bold text-white text-lg">نتائج شهرية — 2026</h3>
                <p className="text-xs text-gray-500 mt-1">نشرنا الخسارة في فبراير بنفس الطريقة</p>
              </div>
              {MONTHLY.map(([month, value, cls]) => (
                <div key={month} className="flex items-center justify-between px-6 py-4 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-400">{month}</span>
                  <span className={`font-bold ${cls}`} style={{ direction: 'ltr' }}>{value}</span>
                </div>
              ))}
              <div className="px-6 py-3 border-t border-gray-800 bg-gray-900/40">
                <p className="text-xs text-gray-600">نتائج تتبعية — ليست ضمانات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the model works */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">كيف يعمل الموديل</h2>
          <p className="text-gray-400 mb-10">
            نشرح المنهجية لأنك تستحق تفهم ما وراء الأرقام — لا "صندوق أسود" هنا.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'اختيار الأسهم',
                items: [
                  ['الاستراتيجية', 'زخم الأسعار + شذوذات الحجم'],
                  ['السوق', 'أسهم أمريكية، أوبشنز، كريبتو مختار'],
                  ['مدة الاحتفاظ', 'من أيام إلى أسابيع'],
                  ['الهدف', 'التفوق على S&P 500 — ليس ضماناً'],
                ],
              },
              {
                icon: ShieldCheck,
                title: 'إدارة المخاطر',
                items: [
                  ['الحد الأقصى للمركز', '10% لكل صفقة'],
                  ['وقف الخسارة', 'إلزامي في كل فكرة تداول'],
                  ['الحد الأقصى للخسارة', '15% كحد تاريخي — قد يتجاوز'],
                  ['الشفافية', 'كل صفقة منشورة — حتى الخاسرة'],
                ],
              },
              {
                icon: BarChart3,
                title: 'أفكار التداول',
                items: [
                  ['المعدل اليومي', '3-8 أفكار في المتوسط'],
                  ['كل فكرة تتضمن', 'السبب + الدخول + الهدف + الوقف'],
                  ['التسليم', 'تيليجرام + لوحة التحكم'],
                  ['القرار', 'لك أنت — ليس إلزامياً'],
                ],
              },
              {
                icon: Users,
                title: 'المجتمع',
                items: [
                  ['الأعضاء النشطون', '+12,000'],
                  ['تيليجرام', 'نقاش + أفكار التداول'],
                  ['يوتيوب', 'فيديوهات بحثية مجانية أسبوعياً'],
                  ['السجل التاريخي', 'متاح للكل — شفافية كاملة'],
                ],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg">{title}</h3>
                </div>
                <div className="space-y-3">
                  {items.map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between text-sm gap-4">
                      <span className="text-gray-400 shrink-0">{label}:</span>
                      <span className="text-white font-medium text-left" style={{ direction: 'ltr' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — reframed */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">تابع أفكار التداول</h2>
          <p className="text-gray-400 mb-8 text-lg">
            اشترك لتصلك كل فكرة تداول مع شرحها الكامل. الفيديوهات التحليلية مجانية دائماً على يوتيوب.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <YoutubeIcon size={20} /> يوتيوب — مجاناً
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">شوف الباقات</Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            الأداء السابق لا يضمن النتائج المستقبلية.{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">إفصاح المخاطر</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

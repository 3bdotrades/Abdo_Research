import { Link } from 'react-router-dom'
import { BarChart3, Target, ShieldCheck, Users } from 'lucide-react'

function TelegramIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const PERFORMANCE = [
  ['شهر واحد',       '+8.7%',  '+2.3%'],
  ['3 أشهر',         '+22.4%', '+9.2%'],
  ['من بداية العام', '+38.2%', '+24.1%'],
  ['سنة كاملة',      '+42.1%', '+28.5%'],
]

export default function Fund() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-14 px-4 border-b border-gray-800/80">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/70 border border-brand-800/50 text-brand-300 text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse shrink-0" />
            بيانات المحفظة المباشرة
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4">محفظة أبدو ريسيرش</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            موديل الذكاء الاصطناعي يدير محفظة حقيقية — كل صفقة وعائد وقرار موثق بشفافية كاملة مقارنة بـ <span style={{ direction: 'ltr', display: 'inline-block' }}>S&P 500</span>.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            <div className="card p-8 bg-gradient-to-br from-brand-950/50 to-gray-900 border-brand-900/40">
              <div className="text-sm text-gray-400 mb-2">عائد هذا العام</div>
              <div className="text-5xl font-extrabold text-accent-400 mb-2" style={{ direction: 'ltr', textAlign: 'right' }}>+38.2%</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded" style={{ direction: 'ltr' }}>S&P 500: +24.1%</span>
                <span className="text-xs text-accent-400 font-bold">+14.1% أعلى من المؤشر</span>
              </div>
            </div>
            <div className="card p-8">
              <div className="text-sm text-gray-400 mb-2">نسبة نجاح الإشارات</div>
              <div className="text-5xl font-extrabold text-brand-400 mb-2" style={{ direction: 'ltr', textAlign: 'right' }}>82%</div>
              <div className="text-xs text-gray-500">متوسط آخر 30 يوم</div>
            </div>
            <div className="card p-8">
              <div className="text-sm text-gray-400 mb-2">الحد الأقصى للخسارة</div>
              <div className="text-5xl font-extrabold text-white mb-2" style={{ direction: 'ltr', textAlign: 'right' }}>-8.3%</div>
              <div className="text-xs text-gray-500">أقصى خسارة من القمة للقاع</div>
            </div>
          </div>

          {/* Returns table */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-bold text-white text-lg">العوائد مقابل <span style={{ direction: 'ltr', display: 'inline-block' }}>S&P 500</span></h3>
              </div>
              <div className="grid grid-cols-3 px-6 py-3 bg-gray-800/30 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>الفترة</span>
                <span className="text-accent-400 text-center">المحفظة</span>
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
                <h3 className="font-bold text-white text-lg">إحصائيات الإشارات</h3>
              </div>
              {[
                ['نسبة نجاح الإشارات', '82%',       'text-accent-400'],
                ['متوسط عائد الصفقة', '+1.8%',      'text-accent-400'],
                ['أفضل شهر',          '+18.2% (مارس)', 'text-accent-400'],
                ['أسوأ شهر',          '-5.1% (فبراير)', 'text-red-400'],
                ['إجمالي الإشارات',   '127 (30 يوم)', 'text-white'],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex items-center justify-between px-6 py-4 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-400">{label}</span>
                  <span className={`font-bold ${cls}`} style={{ direction: 'ltr' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10">كيف يعمل الموديل</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'موديل اختيار الأسهم',
                items: [
                  ['الاستراتيجية', 'هجين ذكاء اصطناعي (زخم + عكس الاتجاه)'],
                  ['السوق', 'أسهم أمريكية، أوبشنز، كريبتو مختار'],
                  ['مدة الاحتفاظ', 'من دقائق إلى أسابيع'],
                  ['الهدف السنوي', '30-50%'],
                ],
              },
              {
                icon: ShieldCheck,
                title: 'إدارة المخاطر',
                items: [
                  ['الحد الأقصى للمركز', '10% لكل صفقة'],
                  ['وقف الخسارة', 'إلزامي في كل إشارة'],
                  ['الحد الأقصى للخسارة', '15% كحد أقصى'],
                  ['التقارير', 'تاريخ كامل للصفقات منشور'],
                ],
              },
              {
                icon: BarChart3,
                title: 'توليد الإشارات',
                items: [
                  ['عدد الإشارات يومياً', '3-8 في المتوسط'],
                  ['تحديث', 'كل 15 دقيقة'],
                  ['التسليم', 'تيليجرام + لوحة التحكم'],
                  ['تقييم الثقة', '0-100% لكل إشارة'],
                ],
              },
              {
                icon: Users,
                title: 'المجتمع',
                items: [
                  ['الأعضاء النشطون', '12,000+'],
                  ['تيليجرام', 'تنبيهات الإشارات المباشرة'],
                  ['يوتيوب', 'فيديوهات بحثية أسبوعية'],
                  ['السجل التاريخي', 'شفافية كاملة'],
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
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{label}:</span>
                      <span className="text-white font-medium text-left" style={{ direction: 'ltr' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">انسخ محفظتنا</h2>
          <p className="text-gray-400 mb-8 text-lg">اشترك لتحصل على كل إشارة نتداولها. نفّذها في بروكرك وتابع نتائجك.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <TelegramIcon size={20} /> انضم على تيليجرام
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">اشترك في الإشارات</Link>
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

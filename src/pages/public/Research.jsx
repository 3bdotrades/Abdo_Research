import { BookOpen, Download, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

function YoutubeIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const REPORTS = [
  { id: 1, title: 'تحليل قطاع الذكاء الاصطناعي والرقائق الإلكترونية — Q1 2024', desc: 'دراسة معمقة لـ NVDA وAMD وTSMC مع التقييمات وأسعار الهدف. تحليل فني شامل مع مستويات الدخول والخروج.', date: '14 مارس 2024', category: 'تحليل قطاعي', free: true },
  { id: 2, title: 'استراتيجية الأوبشنز: البيع المغطى لتوليد الدخل', desc: 'دليل شامل لاستراتيجيات البيع المغطى مع نتائج الاختبار التاريخي. أفضل الممارسات لتوليد الدخل.', date: '10 مارس 2024', category: 'استراتيجية', free: true },
  { id: 3, title: 'دليل موسم الأرباح للمتداولين', desc: 'استراتيجيات التقلب قبل الأرباح وإعدادات الصفقات بعدها. إشارات مختبرة تاريخياً.', date: '5 مارس 2024', category: 'أرباح', free: false },
  { id: 4, title: 'هيكل سوق الكريبتو وفرص التداول', desc: 'أنماط ارتباط البيتكوين، صفقات زخم العملات البديلة، وفرص DeFi. منطق توليد الإشارات موضح.', date: '28 فبراير 2024', category: 'كريبتو', free: false },
  { id: 5, title: 'التوقعات الاقتصادية الكلية وتأثير قرارات الفيدرالي', desc: 'سيناريوهات أسعار الفائدة وتوصيات تموضع المحفظة لكل سيناريو.', date: '20 فبراير 2024', category: 'اقتصاد كلي', free: false },
  { id: 6, title: 'مستويات الدعم والمقاومة التقنية — تحديث مارس', desc: 'المستويات الحرجة للمؤشرات الكبرى والأسهم. تحديث أسبوعي مع إعدادات الاختراق الجديدة.', date: '15 فبراير 2024', category: 'تحليل فني', free: false },
]

const CATEGORIES = [
  { label: 'التحليل الفني',           count: 12, desc: 'مستويات الدعم والمقاومة، أنماط المخططات، وفرص الاختراق.' },
  { label: 'تحليل القطاعات',          count: 18, desc: 'دراسات معمقة في التكنولوجيا والرعاية الصحية والطاقة والمال.' },
  { label: 'استراتيجيات التداول',     count: 15, desc: 'استراتيجيات أوبشنز، إعدادات صفقات متأرجحة، وأنظمة مختبرة.' },
  { label: 'التحليل الاقتصادي الكلي', count: 10, desc: 'قرارات الفيدرالي، سيناريوهات أسعار الفائدة، وتحليل المخاطر.' },
  { label: 'الكريبتو والأصول الرقمية', count: 5, desc: 'أنماط البيتكوين، تحليل العملات البديلة، ومقاييس البلوكشين.' },
  { label: 'الأرباح والأحداث',        count: 8,  desc: 'تحليل ما قبل الأرباح وفرص الصفقات بعد النتائج.' },
]

export default function Research() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-14 px-4 border-b border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4">بحوث وتحليلات السوق</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            تحليلات احترافية واستراتيجيات تداول ودراسات قطاعية معمقة. التقارير الكاملة هنا، والشرح المرئي على يوتيوب.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <BookOpen size={18} className="text-brand-400" />
              <span>+50 تقرير منشور</span>
            </div>
            <span className="text-gray-700">•</span>
            <span className="text-gray-400">تحديث أسبوعي</span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-400">وصول VIP+ الكامل</span>
          </div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="py-6 px-4 bg-gradient-to-r from-red-950/30 to-gray-900/60 border-b border-red-900/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">شاهد الشرح على يوتيوب</p>
            <p className="text-gray-400 text-sm">فيديوهات تفصيلية لكل تقرير — مجاناً على قناتنا.</p>
          </div>
          <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors whitespace-nowrap">
            <YoutubeIcon size={18} /> شاهد على يوتيوب
          </a>
        </div>
      </section>

      {/* Reports */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">أحدث التقارير</h2>
          <div className="space-y-4">
            {REPORTS.map((report) => (
              <div key={report.id} className="card hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 font-medium">{report.category}</span>
                      {!report.free && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-950/60 border border-brand-900/50 text-brand-300 text-xs font-medium">
                          <Lock size={11} /> VIP فقط
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1.5">{report.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{report.desc}</p>
                    <div className="text-xs text-gray-600">{report.date}</div>
                  </div>
                  <button className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-colors shrink-0 ${
                    report.free ? 'bg-brand-600 hover:bg-brand-500 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Download size={14} />
                      {report.free ? 'تحميل' : 'فتح'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">تصنيفات البحوث</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(({ label, count, desc }) => (
              <div key={label} className="card hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">{label}</h3>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full shrink-0">{count} تقرير</span>
                </div>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access tiers */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">مستويات الوصول</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'مجاني', color: 'text-gray-400', items: ['آخر تقريرين كل شهر', 'النشرة الأسبوعية للسوق', 'فيديوهات يوتيوب', 'معاينة الإشارات (متأخر 24 ساعة)'], dot: 'bg-gray-400' },
              { name: 'احترافي', color: 'text-brand-400', highlight: true, items: ['كل ما في المجاني، بالإضافة إلى:', 'إشارات مباشرة فورية', 'تنبيهات تيليجرام', 'وصول غير محدود للتقارير', 'تقارير قطاعية متميزة', 'سجل الإشارات والتحليلات'], dot: 'bg-brand-400' },
              { name: 'VIP+', color: 'text-brand-400', items: ['كل ما في الاحترافي، بالإضافة إلى:', 'أرشيف كامل +50 تقرير', 'أفكار تداول يومية حصرية', 'وصول مباشر لفريق التحليل', 'جلسات استراتيجية شهرية', 'وصول API للتكامل'], dot: 'bg-accent-400' },
            ].map(({ name, color, highlight, items, dot }) => (
              <div key={name} className={`card ${highlight ? 'border-brand-900/50 bg-gradient-to-b from-brand-950/30 to-gray-900' : ''}`}>
                <div className={`font-bold text-sm mb-3 uppercase tracking-wider ${color}`}>{name}</div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot} mt-1.5 shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">اشترك للوصول الكامل</h2>
          <p className="text-gray-400 mb-8 text-lg">احصل على جميع التقارير والاستراتيجيات والتحليلات الحصرية. ترقّى إلى VIP+.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="btn-primary text-base px-8 py-4">ترقّى إلى VIP+</Link>
            <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-4">
              <YoutubeIcon size={20} /> شاهد مجاناً على يوتيوب
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

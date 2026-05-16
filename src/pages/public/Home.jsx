import { Link } from 'react-router-dom'
import { CheckCircle2, BarChart3, Zap, BookOpen } from 'lucide-react'

function TelegramIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const PILLARS = [
  {
    icon: BarChart3,
    title: 'إدارة المحفظة',
    titleEn: 'Portfolio',
    desc: 'الموديل يحدد الأسهم اللي تتفوق على S&P 500 باستمرار. كل الأداء شفاف وموثق.',
    stat: '+38.2%',
    statLabel: 'هذا العام — مقابل +24.1% للمؤشر',
  },
  {
    icon: Zap,
    title: 'إشارات مباشرة',
    titleEn: 'Live Signals',
    desc: 'كل إشارة تجيك على تيليجرام فيها: سعر الدخول، الهدف، وقف الخسارة، ونسبة الثقة.',
    stat: '82%',
    statLabel: 'نسبة نجاح الإشارات — متوسط 30 يوم',
  },
  {
    icon: BookOpen,
    title: 'تحليلات السوق',
    titleEn: 'Research',
    desc: 'تقارير متخصصة في القطاعات والأسهم. فيديوهات تحليل شاملة على يوتيوب كل أسبوع.',
    stat: '+50',
    statLabel: 'تقرير منشور — يتجدد كل أسبوع',
  },
]

const PERFORMANCE = [
  ['شهر واحد',       '+8.7%',  '+2.3%'],
  ['3 أشهر',         '+22.4%', '+9.2%'],
  ['من بداية العام', '+38.2%', '+24.1%'],
  ['سنة كاملة',      '+42.1%', '+28.5%'],
]

const STEPS = [
  {
    num: '01',
    title: 'انضم للمجتمع',
    desc: 'تابعنا على تيليجرام للإشارات المباشرة، واشترك في يوتيوب للتحليلات والبحوث الأسبوعية.',
  },
  {
    num: '02',
    title: 'استلم إشاراتك',
    desc: 'كل إشارة فيها كل اللي تحتاجه: سعر الدخول، الهدف، وقف الخسارة، وسبب الصفقة.',
  },
  {
    num: '03',
    title: 'نفّذ وتابع',
    desc: 'نفّذ الإشارة في بروكرك. تابع أداءك مقارنة بمحفظتنا في لوحة التحكم.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-950/70 via-gray-950 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-brand-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse shrink-0" />
            الموديل يعمل — آخر إشارة منذ 15 دقيقة
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            إشارات تداول{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
              تتفوق على السوق
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            موديل ذكاء اصطناعي يختار أفضل الأسهم في السوق الأمريكي.
            إشارات فورية على تيليجرام مع كل التفاصيل اللي تحتاجها للتداول.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <TelegramIcon size={20} /> انضم على تيليجرام
            </a>
            <Link to="/fund" className="btn-secondary text-base px-8 py-4">
              شوف الأداء
            </Link>
          </div>

          {/* Live signal preview — kept LTR since it's financial data */}
          <div className="mt-16 max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60" dir="ltr">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/80">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-gray-500 text-xs font-mono">live-signal</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-accent-400">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <pre className="p-5 text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto text-left">
{`🟢 BUY — $NVDA
   Entry:     $142.30
   Target:    $156.80  (+10.2%)
   Stop Loss: $138.50  (-2.7%)
   Confidence: 87%

🔴 SELL — $SPY
   Exit at market
   Realized:  +$312  (+2.1%)`}
            </pre>
            <div className="border-t border-gray-800 px-5 py-3 bg-gray-900/50 flex gap-8">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Win Rate (30d)</div>
                <div className="text-lg font-bold text-accent-400">82%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Avg Trade</div>
                <div className="text-lg font-bold text-accent-400">+1.8%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-gray-800/60 bg-gray-900/20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['+38.2%', 'عائد هذا العام'],
            ['vs +24.1%', 'S&P 500'],
            ['82%', 'نسبة نجاح الإشارات'],
            ['+12,000', 'متداول في المجتمع'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold text-white mb-1" style={{ direction: 'ltr' }}>{v}</div>
              <div className="text-gray-500 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">كل اللي تحتاجه للتداول الذكي</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              محفظة حقيقية، إشارات مباشرة، وتحليلات عميقة — كل شيء في مكان واحد.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, desc, stat, statLabel }) => (
              <div key={title} className="card hover:border-gray-700 transition-colors group flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center mb-5 group-hover:bg-brand-900/60 transition-colors shrink-0">
                  <Icon size={22} className="text-brand-400" />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="mt-5 pt-5 border-t border-gray-800">
                  <div className="text-2xl font-extrabold text-brand-400" style={{ direction: 'ltr', textAlign: 'right' }}>{stat}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance table */}
      <section className="py-24 px-4 bg-gray-900/25">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">أداء ثابت في كل الفترات</h2>
            <p className="text-gray-400 text-lg">محفظتنا مقابل <span style={{ direction: 'ltr', display: 'inline-block' }}>S&P 500</span> في كل الفترات الزمنية.</p>
          </div>
          <div className="card overflow-hidden p-0">
            <div className="grid grid-cols-3 px-6 py-3 bg-gray-800/40 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>الفترة</span>
              <span className="text-accent-400 text-center">أبدو ريسيرش</span>
              <span className="text-center" style={{ direction: 'ltr' }}>S&P 500</span>
            </div>
            {PERFORMANCE.map(([period, fund, spy]) => (
              <div key={period} className="grid grid-cols-3 px-6 py-4 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors items-center">
                <span className="text-gray-400 font-medium">{period}</span>
                <span className="font-bold text-accent-400 text-xl text-center" style={{ direction: 'ltr' }}>{fund}</span>
                <span className="text-gray-500 font-medium text-center" style={{ direction: 'ltr' }}>{spy}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">
            الأداء السابق لا يضمن النتائج المستقبلية.{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">إفصاح المخاطر</Link>
          </p>
        </div>
      </section>

      {/* How to join */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">ابدأ في 3 خطوات</h2>
          <p className="text-gray-400 mb-16 text-lg">انضم لآلاف المتداولين اللي يستخدمون إشاراتنا يومياً.</p>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="text-right">
                <div className="text-7xl font-extrabold text-gray-800/80 mb-4 leading-none" style={{ direction: 'ltr', textAlign: 'right' }}>{num}</div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <TelegramIcon size={20} /> انضم تيليجرام
            </a>
            <Link to="/register" className="btn-secondary text-base px-8 py-4">
              أنشئ حساب مجاني
            </Link>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-24 px-4 bg-gray-900/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">ليش تثق في أبدو ريسيرش؟</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">شفافية كاملة، نتائج حقيقية، بدون مبالغة.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['شفافية كاملة', 'كل إشارة موثقة: الدخول، الخروج، الربح أو الخسارة. تاريخ كل الصفقات متاح للكل.'],
              ['ذكاء اصطناعي حقيقي', 'الموديل يحلل حركة الأسعار والحجم والعوامل الاقتصادية للعثور على أفضل الفرص.'],
              ['إدارة المخاطر', 'كل إشارة فيها وقف خسارة إلزامي. الحد الأقصى للخسارة تاريخياً أقل من 10%.'],
              ['تحديث يومي', 'تحليل السوق قبل الافتتاح وبعد الإغلاق كل يوم على تيليجرام ويوتيوب.'],
              ['أسواق متعددة', 'أسهم أمريكية، أوبشنز، وكريبتو. كل شيء في مكان واحد.'],
              ['مجتمع نشيط', 'أكثر من 12,000 متداول يشاركون النتائج ويتعلمون مع بعض يومياً.'],
            ].map(([title, desc]) => (
              <div key={title} className="card hover:border-gray-700 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 size={18} className="text-accent-400 mt-0.5 shrink-0" />
                  <h3 className="font-bold text-white text-lg">{title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pr-7">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center card border-brand-900/40 bg-gradient-to-b from-brand-950/50 to-gray-900 py-16">
          <h2 className="text-4xl font-bold text-white mb-4">جاهز تتداول بميزة حقيقية؟</h2>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            انضم لأكثر من 12,000 متداول يستخدمون إشاراتنا. مجاني للبدء، بدون بطاقة ائتمان.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <TelegramIcon size={20} /> انضم تيليجرام
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">
              شوف الباقات
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            بالاشتراك توافق على{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">إفصاح المخاطر</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}

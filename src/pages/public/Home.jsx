import { Link } from 'react-router-dom'
import { BookOpen, MessageSquare, TrendingUp, Eye, AlertTriangle } from 'lucide-react'

function TelegramIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function YoutubeIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const WHAT_YOU_GET = [
  {
    icon: YoutubeIcon,
    title: 'تحليلات يوتيوب — مجاناً',
    desc: 'فيديو أسبوعي على الأقل يشرح حركة السوق وما يتوقعه الموديل. مجاني للكل، بدون اشتراك.',
  },
  {
    icon: MessageSquare,
    title: 'متابعة يومية على تيليجرام',
    desc: 'أفكار التداول تنشر مع شرح المنطق الكامل — لا "اشترِ هذا" بدون سياق. أنت تقرر إذا تنفّذ.',
  },
  {
    icon: BookOpen,
    title: 'تقارير بحثية متعمقة',
    desc: 'تحليل القطاعات والأسهم بالأرقام. التقارير الكاملة للمشتركين، وملخص يوتيوب للكل.',
  },
  {
    icon: Eye,
    title: 'شفافية كاملة — بما فيها الخسائر',
    desc: 'كل صفقة تُنشر — الرابحة والخاسرة. أسوأ شهر لدينا كان -5.1%. نحن لا نخفي النتائج السيئة.',
  },
]

const PERFORMANCE = [
  ['شهر واحد',       '+8.7%',  '+2.3%'],
  ['3 أشهر',         '+22.4%', '+9.2%'],
  ['من بداية العام', '+38.2%', '+24.1%'],
  ['سنة كاملة',      '+42.1%', '+28.5%'],
  ['أسوأ شهر',       '-5.1%',  '-3.2%'],
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-950/70 via-gray-950 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-brand-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            تحليل أسهم أمريكية —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
              شفاف ومفصّل
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            أبدو يتابع السوق الأمريكي يومياً ويشارك تحليلاته وأفكاره على يوتيوب وتيليجرام.
            المكاسب والخسائر — كل شيء منشور وموثق.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            هذا بحث وتحليل شخصي — ليس نصيحة استثمارية.
            القرار النهائي دائماً لك.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <YoutubeIcon size={20} /> شاهد القناة مجاناً
            </a>
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-4">
              <TelegramIcon size={20} /> انضم للمجتمع
            </a>
          </div>
        </div>
      </section>

      {/* About Abdo */}
      <section className="py-16 px-4 border-y border-gray-800/60 bg-gray-900/30">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-gray-950 font-black text-3xl shrink-0"
            style={{ fontFamily: 'Inter, sans-serif', direction: 'ltr' }}>
            A
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">من هو أبدو؟</h2>
            <p className="text-gray-400 leading-relaxed">
              متداول مستقل يبني موديل لتحليل السوق الأمريكي منذ سنوات.
              يشارك كل شيء علناً — التحليل والمنهجية والنتائج — لأنه يؤمن أن الشفافية أهم من التسويق.
              قناة يوتيوب مجانية فيها أكثر من{' '}
              <span style={{ direction: 'ltr', display: 'inline-block' }}>50</span>{' '}
              فيديو تحليلي. تيليجرام للمتابعة اليومية. الاشتراك المدفوع للي يريد التفاصيل الكاملة.
            </p>
          </div>
        </div>
      </section>

      {/* Stats — community, not returns */}
      <section className="py-12 border-b border-gray-800/60 bg-gray-900/10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['+50', 'فيديو تحليلي مجاني'],
            ['+50', 'تقرير بحثي منشور'],
            ['+12,000', 'عضو في المجتمع'],
            ['كل أسبوع', 'محتوى جديد'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold text-white mb-1" style={{ direction: 'ltr' }}>{v}</div>
              <div className="text-gray-500 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">ماذا تجد هنا؟</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              تحليل موضح بالكامل — لا "ثق بي فقط". كل فكرة تداول تأتي مع السبب الكامل.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {WHAT_YOU_GET.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card hover:border-gray-700 transition-colors group flex gap-5">
                <div className="w-11 h-11 rounded-xl bg-brand-950/60 border border-brand-900/50 flex items-center justify-center shrink-0 group-hover:bg-brand-900/60 transition-colors">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance table — honest version with worst month */}
      <section className="py-24 px-4 bg-gray-900/25">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-white mb-4">أداء المحفظة التتبعية</h2>
            <p className="text-gray-400 text-lg">
              هذه نتائج محفظة نتابعها لاختبار الموديل — ليست محفظة مُدارة ولا وعداً بعوائد.
            </p>
          </div>

          {/* Disclaimer banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 mb-6 text-right">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-200/80 text-sm leading-relaxed">
              الأداء السابق لا يعني تكراره مستقبلاً. التداول ينطوي على مخاطر خسارة رأس المال.
              هذه نتائج تتبعية فقط — ليست دعوة للاستثمار.{' '}
              <Link to="/risk-disclosure" className="underline hover:text-amber-200">إفصاح المخاطر الكامل</Link>
            </p>
          </div>

          <div className="card overflow-hidden p-0">
            <div className="grid grid-cols-3 px-6 py-3 bg-gray-800/40 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>الفترة</span>
              <span className="text-brand-400 text-center">الموديل</span>
              <span className="text-center" style={{ direction: 'ltr' }}>S&P 500</span>
            </div>
            {PERFORMANCE.map(([period, fund, spy], i) => (
              <div key={period}
                className={`grid grid-cols-3 px-6 py-4 border-t border-gray-800/60 items-center ${i === PERFORMANCE.length - 1 ? 'bg-red-950/10' : 'hover:bg-gray-800/20 transition-colors'}`}>
                <span className="text-gray-400 font-medium">{period}</span>
                <span className={`font-bold text-xl text-center ${fund.startsWith('-') ? 'text-red-400' : 'text-accent-400'}`}
                  style={{ direction: 'ltr' }}>{fund}</span>
                <span className={`font-medium text-center ${spy.startsWith('-') ? 'text-red-400' : 'text-gray-500'}`}
                  style={{ direction: 'ltr' }}>{spy}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-3">
            جميع النتائج موثقة — المكاسب والخسائر معاً.
          </p>
        </div>
      </section>

      {/* How it works — reframed as "how to benefit" */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">كيف تستفيد؟</h2>
          <p className="text-gray-400 mb-16 text-lg">ثلاث خطوات — الأولى مجانية تماماً.</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: '01',
                title: 'تابع المحتوى المجاني',
                desc: 'ابدأ بقناة يوتيوب. فيديوهات أسبوعية تشرح حركة السوق وتحليل الأسهم. لا تحتاج أي اشتراك.',
              },
              {
                num: '02',
                title: 'افهم قبل أن تنفّذ',
                desc: 'كل فكرة تداول على تيليجرام تأتي مع شرح المنطق. لا تنفّذ شيئاً لا تفهم سببه.',
              },
              {
                num: '03',
                title: 'القرار لك أنت',
                desc: 'هذا تحليل شخصي — ليس توصية. أنت تقرر ماذا تفعل بمالك بناءً على فهمك.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="text-right">
                <div className="text-7xl font-extrabold text-gray-800/80 mb-4 leading-none"
                  style={{ direction: 'ltr', textAlign: 'right' }}>{num}</div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <YoutubeIcon size={20} /> ابدأ بيوتيوب — مجاناً
            </a>
            <Link to="/register" className="btn-secondary text-base px-8 py-4">
              أنشئ حساب مجاني
            </Link>
          </div>
        </div>
      </section>

      {/* Why trust us — honest version */}
      <section className="py-24 px-4 bg-gray-900/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">ليش مختلفون؟</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              معظم قنوات التداول تخفي الخسائر وتبالغ في النتائج. نحن لا نفعل ذلك.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['نشر الخسائر مثل المكاسب', 'أسوأ شهر لدينا (-5.1% في فبراير) منشور بنفس الوضوح كأفضل شهر (+18.2% في مارس).'],
              ['لا وعود بالعوائد', 'لا نقول "اربح كذا بالشهر". التداول فيه مخاطر حقيقية وقد تخسر رأس مالك.'],
              ['التحليل قبل التنفيذ', 'كل فكرة تداول تأتي مع السبب الكامل — لا "ثق بي" بدون منطق.'],
              ['المحتوى المجاني أولاً', 'يوتيوب مجاني تماماً. جرّب واحكم بنفسك قبل أن تدفع أي شيء.'],
              ['الموديل موضح للعلن', 'نشرح كيف يعمل الموديل في التقارير والفيديوهات — ليس "صندوقاً أسود".'],
              ['مجتمع يناقش ويشكك', 'تيليجرام ليس للتعليمات فقط — الأعضاء يناقشون ويختلفون وهذا مقصود.'],
            ].map(([title, desc]) => (
              <div key={title} className="card hover:border-gray-700 transition-colors">
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center card border-brand-900/40 bg-gradient-to-b from-brand-950/50 to-gray-900 py-16">
          <h2 className="text-4xl font-bold text-white mb-4">ابدأ بالمجاني</h2>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            القناة مجانية. المجتمع مجاني. جرّب قبل أن تقرر إذا الاشتراك يناسبك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <YoutubeIcon size={20} /> شاهد يوتيوب مجاناً
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">
              شوف الباقات
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            التداول ينطوي على مخاطر.{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">اقرأ إفصاح المخاطر</Link>{' '}
            قبل أي قرار استثماري.
          </p>
        </div>
      </section>
    </div>
  )
}

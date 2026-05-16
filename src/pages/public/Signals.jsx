import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

function TelegramIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const IDEAS = [
  { symbol: 'NVDA', action: 'شراء', actionEn: 'BUY',  entry: 142.30, target: 156.80, stop: 138.50, confidence: 87, time: '2:34 PM',
    reason: 'كسر مستوى مقاومة رئيسي مع ارتفاع في الحجم. زخم إيجابي في قطاع الرقائق.' },
  { symbol: 'TSLA', action: 'بيع',  actionEn: 'SELL', entry: 245.50, target: 230.20, stop: 252.10, confidence: 81, time: '1:12 PM',
    reason: 'ضعف في بيانات التسليم Q1 + تكوين رأس وكتفين على الرسم اليومي.' },
  { symbol: 'AAPL', action: 'شراء', actionEn: 'BUY',  entry: 189.45, target: 198.30, stop: 185.20, confidence: 79, time: '12:48 PM',
    reason: 'ارتداد من دعم قوي مع احتمالية إعلان إعادة شراء الأسهم قريباً.' },
  { symbol: 'SPY',  action: 'بيع',  actionEn: 'SELL', entry: 485.20, target: 475.50, stop: 490.30, confidence: 85, time: '11:30 AM',
    reason: 'بيانات التضخم أعلى من التوقعات — ضغط على توقعات خفض الفائدة.' },
  { symbol: 'QQQ',  action: 'شراء', actionEn: 'BUY',  entry: 378.90, target: 395.40, stop: 374.10, confidence: 88, time: '10:15 AM',
    reason: 'موسم أرباح التقنية أقوى من التوقعات. تدفق إيجابي على المؤشر.' },
  { symbol: 'MSFT', action: 'انتظار', actionEn: 'HOLD', entry: 420.30, target: 435.60, stop: 415.50, confidence: 76, time: '9:45 AM',
    reason: 'في انتظار نتائج الأرباح يوم الأربعاء. لا داعي للدخول قبل الحدث.' },
]

export default function Signals() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="pt-20 pb-10 px-4 border-b border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white mb-4">أفكار التداول</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            كل فكرة تداول تأتي مع السبب الكامل — الدخول والهدف والوقف والمنطق.
            هذا تحليل شخصي، ليس توصية استثمارية. القرار لك.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-right">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-200/70 text-sm leading-relaxed">
              هذه أفكار تداول بناءً على تحليل شخصي — ليست نصائح استثمارية ولا ضماناً بالربح.
              النسبة التاريخية 82% لا تعني أن الصفقة القادمة ستربح.
              لا تستخدم مالاً لا تتحمل خسارته.{' '}
              <Link to="/risk-disclosure" className="underline hover:text-amber-200">إفصاح المخاطر</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 px-4 border-b border-gray-800/40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-10">
          {[
            ['82%', 'نسبة النجاح التاريخية (30 يوم)'],
            ['+1.8%', 'متوسط الربح لكل صفقة'],
            ['-1.2%', 'متوسط الخسارة لكل صفقة'],
            ['127', 'إجمالي الصفقات الشهر الماضي'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-extrabold text-brand-400" style={{ direction: 'ltr' }}>{v}</div>
              <div className="text-sm text-gray-500 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="py-6 px-4 bg-gradient-to-r from-brand-950/40 to-gray-900/60 border-b border-brand-900/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">احصل على أفكار التداول مع شرحها</p>
            <p className="text-gray-400 text-sm">انضم تيليجرام مجاناً — كل فكرة تأتي مع السبب الكامل، أنت تقرر إذا تنفذ.</p>
          </div>
          <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap">
            <TelegramIcon size={18} /> انضم تيليجرام — مجاناً
          </a>
        </div>
      </section>

      {/* Ideas table — LTR numbers, Arabic reasons */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-2xl font-bold text-white">أفكار اليوم</h2>
            <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
              معاينة — البيانات الكاملة للمشتركين
            </span>
          </div>
          <div className="space-y-4">
            {IDEAS.map((idea) => (
              <div key={idea.symbol} className="card hover:border-gray-700 transition-colors">
                {/* Numbers row — LTR */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center mb-4" dir="ltr">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Symbol</div>
                    <div className="text-xl font-extrabold text-white">${idea.symbol}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Action</div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-sm ${
                      idea.actionEn === 'BUY'  ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20' :
                      idea.actionEn === 'SELL' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                      'bg-gray-700/40 text-gray-300 border border-gray-700/40'
                    }`}>
                      {idea.actionEn === 'BUY'  ? <TrendingUp size={14} /> :
                       idea.actionEn === 'SELL' ? <TrendingDown size={14} /> :
                       <Target size={14} />}
                      {idea.action}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Entry</div>
                    <div className="text-lg font-bold text-white">${idea.entry.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Target</div>
                    <div className="text-lg font-bold text-white">${idea.target.toFixed(2)}</div>
                    <div className="text-xs text-accent-400">{idea.actionEn === 'BUY' ? '+' : ''}{(((idea.target - idea.entry) / idea.entry) * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Stop Loss</div>
                    <div className="text-lg font-bold text-white">${idea.stop.toFixed(2)}</div>
                    <div className="text-xs text-red-400">{(((idea.stop - idea.entry) / idea.entry) * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Confidence</div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-400 rounded-full" style={{ width: `${idea.confidence}%` }} />
                      </div>
                      <span className="text-sm font-bold text-white w-8 shrink-0">{idea.confidence}%</span>
                    </div>
                    <div className="text-xs text-gray-600">{idea.time}</div>
                  </div>
                </div>
                {/* Arabic reason — RTL */}
                <div className="border-t border-gray-800/60 pt-3 text-right">
                  <span className="text-xs text-gray-500 ml-2">السبب:</span>
                  <span className="text-sm text-gray-400">{idea.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">أداء الأفكار — آخر 30 يوم</h2>
          <p className="text-gray-500 text-sm mb-8">هذه نتائج تاريخية — ليست ضماناً للمستقبل.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800"><h3 className="font-bold text-white">الإحصائيات</h3></div>
              {[
                ['إجمالي الأفكار',    '127',   'text-white'],
                ['أفكار رابحة',       '104',   'text-accent-400'],
                ['أفكار خاسرة',       '23',    'text-red-400'],
                ['نسبة النجاح',       '82%',   'text-brand-400'],
                ['متوسط الربح',       '+2.1%', 'text-accent-400'],
                ['متوسط الخسارة',     '-1.2%', 'text-red-400'],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex items-center justify-between px-6 py-3.5 border-t border-gray-800/60 hover:bg-gray-800/20 transition-colors">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className={`font-bold ${cls}`} style={{ direction: 'ltr' }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-bold text-white mb-5">توزيع الأسواق</h3>
              <div className="space-y-5">
                {[
                  ['أسهم أمريكية', '65%', '82 فكرة'],
                  ['أوبشنز',       '20%', '25 فكرة'],
                  ['كريبتو',       '15%', '20 فكرة'],
                ].map(([asset, pct, count]) => (
                  <div key={asset}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-gray-400 text-sm">{asset}</span>
                      <span className="text-white font-bold text-sm" style={{ direction: 'ltr' }}>{pct}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 rounded-full" style={{ width: pct }} />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-gray-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">تابع أفكار التداول مع شرحها</h2>
          <p className="text-gray-400 mb-8 text-lg">
            تيليجرام مجاناً للنقاش ومتابعة الأفكار. الباقة المميزة للوصول الكامل مع السياق التحليلي التفصيلي.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4">
              <TelegramIcon size={20} /> انضم تيليجرام مجاناً
            </a>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4">شوف الباقات المميزة</Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            هذا تحليل شخصي — ليس نصيحة استثمارية.{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">إفصاح المخاطر الكامل</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

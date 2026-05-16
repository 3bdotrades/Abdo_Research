import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

const POSTS = [
  {
    slug: 'how-our-model-beats-the-sp500',
    title: 'كيف يتفوق موديلنا على S&P 500 باستمرار',
    excerpt: 'نظرة معمقة على العوامل اللي يحللها الموديل — زخم الأسعار، شذوذات الحجم، وكشف نظام السوق — وليش تنتج ألفا ثابتاً.',
    date: '12 مايو 2026',
    readTime: '6 دقائق',
    tag: 'بحث',
    tagClass: 'badge-pro',
  },
  {
    slug: 'reading-trading-signals',
    title: 'كيف تقرأ وتنفذ إشاراتنا',
    excerpt: 'كل اللي تحتاج معرفته عن سعر الدخول والهدف ووقف الخسارة ونسبة الثقة. دليل عملي للتنفيذ في بروكرك.',
    date: '5 مايو 2026',
    readTime: '4 دقائق',
    tag: 'دليل',
    tagClass: 'badge-free',
  },
  {
    slug: 'risk-management-framework',
    title: 'إطار إدارة المخاطر: ليش كل إشارة فيها وقف خسارة',
    excerpt: 'نشرح ليش كل إشارة ننشرها فيها وقف خسارة إلزامي — وكيف تحجيم الصفقة بناءً عليه يحسن نتائجك بشكل كبير.',
    date: '28 أبريل 2026',
    readTime: '5 دقائق',
    tag: 'استراتيجية',
    tagClass: 'badge-enterprise',
  },
  {
    slug: 'why-telegram-for-signals',
    title: 'ليش نوصّل الإشارات على تيليجرام وليس البريد الإلكتروني',
    excerpt: 'السرعة مهمة في التداول. نشرح ليش إشعارات تيليجرام أسرع بـ 10 مرات من البريد الإلكتروني للتنبيهات الحساسة للوقت.',
    date: '20 أبريل 2026',
    readTime: '3 دقائق',
    tag: 'منتج',
    tagClass: 'badge-free',
  },
]

export default function Blog() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-white mb-4">المدونة</h1>
          <p className="text-gray-400 text-xl">رؤى تداول، أدلة استراتيجية، وتحديثات المنتج.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {POSTS.map((post, i) => (
            <article key={post.slug}
              className={`card hover:border-gray-700 transition-all duration-200 group cursor-pointer flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={post.tagClass}>{post.tag}</span>
                <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Clock size={12} /> {post.readTime} قراءة
                </span>
              </div>
              <h2 className={`font-bold text-white mb-3 group-hover:text-brand-300 transition-colors ${i === 0 ? 'text-2xl' : 'text-lg'}`}>
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-1.5 text-brand-400 text-sm font-semibold group-hover:gap-3 transition-all">
                اقرأ المزيد <ArrowLeft size={14} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center card py-10">
          <h3 className="text-xl font-bold text-white mb-2">احصل على التحديثات في بريدك</h3>
          <p className="text-gray-400 text-sm mb-5">تحليلات جديدة، أدلة استراتيجية، وتحليل الإشارات — أسبوعياً.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="example@email.com" className="input flex-1" dir="ltr" />
            <button type="submit" className="btn-primary">اشترك</button>
          </form>
        </div>
      </div>
    </div>
  )
}

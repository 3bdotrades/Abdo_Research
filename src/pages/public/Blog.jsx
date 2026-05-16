import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const POSTS = [
  {
    slug: 'how-our-model-beats-the-sp500',
    title: 'How Our AI Model Consistently Beats the S&P 500',
    excerpt: 'A deep dive into the factors our model weighs — price momentum, volume anomalies, and macro regime detection — and why they produce consistent alpha.',
    date: 'May 12, 2026',
    readTime: '6 min',
    tag: 'Research',
    tagClass: 'badge-pro',
  },
  {
    slug: 'reading-trading-signals',
    title: 'How to Read and Execute Our Trading Signals',
    excerpt: 'Everything you need to know about entry price, target, stop loss, and confidence score. A practical guide to executing our signals in your own broker.',
    date: 'May 5, 2026',
    readTime: '4 min',
    tag: 'Guide',
    tagClass: 'badge-free',
  },
  {
    slug: 'risk-management-framework',
    title: 'Our Risk Management Framework: Why Every Signal Has a Stop',
    excerpt: 'We explain why every signal we publish comes with a mandatory stop loss — and how position sizing based on that stop can dramatically improve your results.',
    date: 'Apr 28, 2026',
    readTime: '5 min',
    tag: 'Strategy',
    tagClass: 'badge-enterprise',
  },
  {
    slug: 'why-telegram-for-signals',
    title: 'Why We Deliver Signals on Telegram (Not Email)',
    excerpt: 'Speed matters in trading. We break down why Telegram push notifications are 10x faster than email for time-sensitive trade alerts — and how to set it up.',
    date: 'Apr 20, 2026',
    readTime: '3 min',
    tag: 'Product',
    tagClass: 'badge-free',
  },
]

export default function Blog() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-400 text-xl">Trading insights, strategy guides, and product updates.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {POSTS.map((post, i) => (
            <article
              key={post.slug}
              className={`card hover:border-gray-700 transition-all duration-200 group cursor-pointer flex flex-col ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={post.tagClass}>{post.tag}</span>
                <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Clock size={12} /> {post.readTime} read
                </span>
              </div>
              <h2 className={`font-bold text-white mb-3 group-hover:text-brand-300 transition-colors ${
                i === 0 ? 'text-2xl' : 'text-lg'
              }`}>
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-1.5 text-brand-400 text-sm font-medium group-hover:gap-3 transition-all">
                Read more <ArrowRight size={14} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center card py-10">
          <h3 className="text-xl font-semibold text-white mb-2">Get updates in your inbox</h3>
          <p className="text-gray-400 text-sm mb-5">New research, strategy guides, and signal analysis — weekly.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@example.com" className="input flex-1" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  )
}

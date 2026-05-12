import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const POSTS = [
  {
    slug: 'introducing-abdo-research-api',
    title: 'Introducing the Abdo Research ML API',
    excerpt: 'Today we&apos;re launching our public beta — a REST API that gives developers and researchers access to powerful ML models with a single endpoint.',
    date: 'May 12, 2026',
    readTime: '4 min',
    tag: 'Announcement',
    tagColor: 'brand',
  },
  {
    slug: 'understanding-model-confidence-scores',
    title: 'Understanding Model Confidence Scores',
    excerpt: 'Not all predictions are equal. We explain what the confidence field in our API responses means and how to use it responsibly in your application.',
    date: 'May 8, 2026',
    readTime: '6 min',
    tag: 'Guide',
    tagColor: 'accent',
  },
  {
    slug: 'whats-new-advanced-model',
    title: "What&apos;s new in the Advanced Model (Pro+)",
    excerpt: 'Our Pro and Enterprise subscribers now have access to the Advanced model — higher accuracy, richer output format, and multi-class support.',
    date: 'May 1, 2026',
    readTime: '3 min',
    tag: 'Product',
    tagColor: 'green',
  },
  {
    slug: 'responsible-ml-risk-disclosure',
    title: 'Why We Have a Risk Disclosure',
    excerpt: 'ML outputs are powerful tools — but they&apos;re not infallible. We explain the reasoning behind our Risk Disclosure and how to use our API responsibly.',
    date: 'Apr 25, 2026',
    readTime: '5 min',
    tag: 'Trust & Safety',
    tagColor: 'yellow',
  },
]

const tagColors = {
  brand: 'badge-pro',
  accent: 'badge-enterprise',
  green: 'inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-900/50 text-green-300',
  yellow: 'inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-900/50 text-yellow-300',
}

export default function Blog() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-400 text-xl">Product updates, technical guides, and research insights.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {POSTS.map((post, i) => (
            <article
              key={post.slug}
              className={`card hover:border-gray-700 transition-all duration-200 group cursor-pointer flex flex-col ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={tagColors[post.tagColor]}>{post.tag}</span>
                <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Clock size={12} /> {post.readTime} read
                </span>
              </div>
              <h2 className={`font-bold text-white mb-3 group-hover:text-brand-300 transition-colors ${i === 0 ? 'text-2xl' : 'text-lg'}`}>
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
          <h3 className="text-xl font-semibold text-white mb-2">Subscribe to updates</h3>
          <p className="text-gray-400 text-sm mb-5">Get notified when we publish new posts or release new features.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@example.com" className="input flex-1" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  )
}

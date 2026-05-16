import { Link } from 'react-router-dom'

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

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 py-14 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-white mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center shrink-0">
                <span style={{ direction: 'ltr', fontFamily: 'Inter, sans-serif' }} className="text-gray-950 font-black text-xs">AR</span>
              </div>
              أبدو ريسيرش
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              موديل ذكاء اصطناعي لاختيار الأسهم، إشارات تداول فورية، وتحليلات احترافية للسوق.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://t.me/abdoresearch" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-medium transition-colors">
                <TelegramIcon /> تيليجرام
              </a>
              <a href="https://youtube.com/@abdoresearch" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-medium transition-colors">
                <YoutubeIcon /> يوتيوب
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">المنصة</h4>
            <ul className="space-y-2.5">
              {[['/fund','الأداء'],['/signals','الإشارات'],['/research','البحوث'],['/pricing','الأسعار']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">الحساب</h4>
            <ul className="space-y-2.5">
              {[['/login','تسجيل الدخول'],['/register','إنشاء حساب'],['/dashboard','لوحة التحكم'],['/blog','المدونة']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">قانوني</h4>
            <ul className="space-y-2.5">
              {[['/risk-disclosure','إفصاح المخاطر'],['#','سياسة الخصوصية'],['#','الشروط والأحكام']].map(([to, label]) => (
                <li key={label}><Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">جميع الحقوق محفوظة &copy; {new Date().getFullYear()} أبدو ريسيرش</p>
          <p className="text-gray-600 text-xs text-center">
            إشارات التداول لأغراض معلوماتية فقط.{' '}
            <Link to="/risk-disclosure" className="text-brand-500 hover:underline">إفصاح المخاطر</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

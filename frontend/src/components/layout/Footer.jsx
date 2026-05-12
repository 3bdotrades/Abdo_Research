import { Link } from 'react-router-dom'
import { Brain } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-white mb-3">
              <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
                <Brain size={15} className="text-white" />
              </div>
              Abdo Research
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Professional ML inference API. Fast, reliable, and built for scale.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Product</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/pricing', 'Pricing'], ['/docs', 'Documentation'], ['/blog', 'Blog']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Account</h4>
            <ul className="space-y-2">
              {[['/login', 'Sign in'], ['/register', 'Register'], ['/dashboard', 'Dashboard']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Legal</h4>
            <ul className="space-y-2">
              {[['/risk-disclosure', 'Risk Disclosure'], ['#', 'Privacy Policy'], ['#', 'Terms of Service']].map(([to, label]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Abdo Research. All rights reserved.</p>
          <p className="text-gray-600 text-xs text-center">
            ML outputs are for informational purposes only.{' '}
            <Link to="/risk-disclosure" className="text-brand-400 hover:underline">See Risk Disclosure.</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

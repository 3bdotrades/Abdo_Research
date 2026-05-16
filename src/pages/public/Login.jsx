import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'فشل تسجيل الدخول')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-950/60">
            <span style={{ direction: 'ltr', fontFamily: 'Inter, sans-serif' }} className="text-gray-950 font-black text-base">AR</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-1">أهلاً وسهلاً</h1>
        <p className="text-gray-500 text-center text-sm mb-8">سجّل الدخول لحسابك في أبدو ريسيرش</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">البريد الإلكتروني</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="input" placeholder="example@email.com" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">كلمة المرور</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="input" placeholder="••••••••" dir="ltr" />
          </div>
          <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'تسجيل الدخول'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ليس لديك حساب؟{' '}
          <Link to="/register" className="text-brand-400 hover:text-brand-300 font-semibold">أنشئ حساباً مجاناً</Link>
        </p>
      </div>
    </div>
  )
}

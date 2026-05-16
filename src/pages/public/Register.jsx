import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', full_name: '' })
  const { register, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) { toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل'); return }
    try {
      await register(form.email, form.password, form.full_name)
      toast.success('تم إنشاء الحساب! أهلاً بك.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'فشل إنشاء الحساب')
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
        <h1 className="text-2xl font-bold text-white text-center mb-1">أنشئ حسابك</h1>
        <p className="text-gray-500 text-center text-sm mb-8">مجاني للأبد. بدون بطاقة ائتمان.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">الاسم الكامل</label>
            <input type="text" value={form.full_name} onChange={set('full_name')}
              className="input" placeholder="اسمك هنا" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">البريد الإلكتروني</label>
            <input type="email" required value={form.email} onChange={set('email')}
              className="input" placeholder="example@email.com" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">كلمة المرور</label>
            <input type="password" required minLength={8} value={form.password} onChange={set('password')}
              className="input" placeholder="8 أحرف على الأقل" dir="ltr" />
          </div>
          <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'إنشاء حساب مجاني'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">
          بالتسجيل توافق على{' '}
          <Link to="/risk-disclosure" className="text-brand-400 hover:underline">إفصاح المخاطر</Link>.
        </p>
        <p className="text-center text-sm text-gray-500 mt-4">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold">سجّل الدخول</Link>
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import api from '../../utils/api'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

export default function Settings() {
  const { user, fetchMe } = useAuthStore()
  const [name, setName] = useState(user?.full_name || '')

  const updateMutation = useMutation({
    mutationFn: (n) => api.put('/auth/me', { full_name: n }),
    onSuccess: () => { fetchMe(); toast.success('Profile updated') },
    onError: () => toast.error('Update failed'),
  })

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account details.</p>
      </div>

      <div className="card space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input type="email" value={user?.email || ''} disabled className="input opacity-60 cursor-not-allowed" />
          <p className="text-xs text-gray-600 mt-1">Email cannot be changed.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Plan</label>
          <input value={user?.plan || ''} disabled className="input opacity-60 cursor-not-allowed capitalize" />
        </div>

        <button
          onClick={() => updateMutation.mutate(name)}
          disabled={updateMutation.isPending}
          className="btn-primary"
        >
          {updateMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : 'Save changes'}
        </button>
      </div>

      <div className="mt-6 card border-red-900/40">
        <h2 className="text-sm font-semibold text-red-400 mb-1">Danger zone</h2>
        <p className="text-gray-500 text-sm mb-4">To delete your account, contact support.</p>
        <a href="mailto:support@abdoresearch.com" className="btn-outline border-red-700 text-red-400 hover:bg-red-900 hover:text-white text-sm">
          Request account deletion
        </a>
      </div>
    </div>
  )
}

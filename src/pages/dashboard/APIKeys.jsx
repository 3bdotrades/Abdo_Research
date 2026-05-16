import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2, Copy, Eye, EyeOff, Key, Loader2 } from 'lucide-react'
import api from '../../utils/api'
import toast from 'react-hot-toast'

export default function APIKeys() {
  const [name, setName] = useState('')
  const [newKey, setNewKey] = useState(null)
  const [showKey, setShowKey] = useState(false)
  const qc = useQueryClient()

  const { data: keys = [], isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: () => api.get('/api-keys').then(r => r.data),
  })

  const createMutation = useMutation({
    mutationFn: (n) => api.post('/api-keys', { name: n }).then(r => r.data),
    onSuccess: (data) => {
      setNewKey(data.key)
      setShowKey(true)
      setName('')
      qc.invalidateQueries(['api-keys'])
      toast.success('API key created')
    },
    onError: (err) => toast.error(err.response?.data?.detail || 'Failed to create key'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api-keys/${id}`),
    onSuccess: () => { qc.invalidateQueries(['api-keys']); toast.success('Key revoked') },
    onError: () => toast.error('Failed to revoke key'),
  })

  const copy = (text) => { navigator.clipboard.writeText(text); toast.success('Copied to clipboard') }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">API Keys</h1>
        <p className="text-gray-500 text-sm">Create keys to authenticate your API requests. Store keys securely — they are shown only once.</p>
      </div>

      {/* Create key */}
      <div className="card mb-6">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Create new API key</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); if (name.trim()) createMutation.mutate(name.trim()) }}
          className="flex gap-3"
        >
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. production-key" className="input flex-1"
            required maxLength={50}
          />
          <button type="submit" disabled={createMutation.isPending || !name.trim()} className="btn-primary shrink-0">
            {createMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} /> Create</>}
          </button>
        </form>
      </div>

      {/* Reveal new key */}
      {newKey && (
        <div className="mb-6 p-4 rounded-xl border border-green-700/50 bg-green-900/20">
          <p className="text-green-300 text-sm font-semibold mb-2">Your new API key — save it now, it won't be shown again</p>
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3">
            <code className="flex-1 text-sm font-mono text-green-300 break-all">
              {showKey ? newKey : '•'.repeat(40)}
            </code>
            <button onClick={() => setShowKey(!showKey)} className="text-gray-400 hover:text-white shrink-0">
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button onClick={() => copy(newKey)} className="text-gray-400 hover:text-white shrink-0">
              <Copy size={16} />
            </button>
          </div>
          <button onClick={() => setNewKey(null)} className="mt-3 text-xs text-gray-500 hover:text-gray-300">
            I've saved my key — dismiss
          </button>
        </div>
      )}

      {/* Key list */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500"><Loader2 size={24} className="animate-spin mx-auto" /></div>
        ) : keys.length === 0 ? (
          <div className="card text-center py-12">
            <Key size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No API keys yet. Create one above.</p>
          </div>
        ) : keys.map((key) => (
          <div key={key.id} className="card flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center">
                <Key size={16} className="text-gray-400" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">{key.name}</div>
                <div className="text-xs text-gray-500 font-mono">{key.key_prefix}••••••••</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-500 hidden sm:block">
                {key.last_used_at
                  ? `Used ${new Date(key.last_used_at).toLocaleDateString()}`
                  : 'Never used'}
              </div>
              <button
                onClick={() => deleteMutation.mutate(key.id)}
                disabled={deleteMutation.isPending}
                className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-900/20 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

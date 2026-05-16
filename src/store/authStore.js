import { create } from 'zustand'
import api from '../utils/api'

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.access_token)
    set({ user: data.user, token: data.access_token, isLoading: false })
    return data
  },

  register: async (email, password, full_name) => {
    set({ isLoading: true })
    const { data } = await api.post('/auth/register', { email, password, full_name })
    localStorage.setItem('token', data.access_token)
    set({ user: data.user, token: data.access_token, isLoading: false })
    return data
  },

  fetchMe: async () => {
    try {
      const { data } = await api.get('/auth/me')
      set({ user: data })
    } catch {
      set({ user: null, token: null })
      localStorage.removeItem('token')
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))

export default useAuthStore

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore {
  user: null | {
    _id: string
    name: string
    email: string
    role: string
    treatment: {
      medications: string[]
      diet: string
      activities: string[]
      duration: string
    }
  }
  token: string | null
}

interface UserActions {
  setUser: (user: AuthStore['user']) => void
  setToken: (token: AuthStore['token']) => void
  logout: () => void
}

const initialState = {
  user: {
    _id: '',
    name: '',
    email: '',
    role: '',
    treatment: {
      medications: [],
      diet: '',
      activities: [],
      duration: '',
    }
  },
  token: null,
}

export const useAuthStore = create<AuthStore & UserActions>()(
  persist(
    (set) => ({
      user: {
        _id: initialState.user._id,
        name: initialState.user.name,
        email: initialState.user.email,
        role: initialState.user.role,
        treatment: initialState.user.treatment
      },
      token: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, token: null })
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useAuthStore

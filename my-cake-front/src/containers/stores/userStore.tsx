import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  first_name: string;
  email: string;
  // cualquier otro campo del perfil
}

interface UserStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoggedIn: false,
      loading: false,
      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken, isLoggedIn: true, loading: false }),
      logout: () =>
        set({ user: null, token: null, refreshToken: null, isLoggedIn: false, loading: false }),
        setLoading: (value) => set({ loading: value }),
    }),
    {
      name: 'user-auth-storage',
    }
  )
);

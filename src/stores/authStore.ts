import { create } from 'zustand';

interface User {
  id: string;
  role: 'STUDENT' | 'ADMIN' | 'PERSONNEL';
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: (value: boolean) => void;
  setUserFromToken: (token: string) => void;
  logout: () => void;
}

function parseJwt(token: string): any {
  try {
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (err) {
    console.error('Ошибка разбора JWT:', err);
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem('accessToken');
  const decoded = token ? parseJwt(token) : null;

  return {
    isAuthenticated: !!token,
    user: decoded
      ? {
          id: decoded.id,
          role: decoded.role,
          email: decoded.sub,
        }
      : null,

    setAuthenticated: (value) => set({ isAuthenticated: value }),

    setUserFromToken: (token: string) => {
      localStorage.setItem('accessToken', token);
      const decoded = parseJwt(token);
      set({
        isAuthenticated: true,
        user: decoded
          ? {
              id: decoded.id,
              role: decoded.role,
              email: decoded.sub,
            }
          : null,
      });
    },

    logout: () => {
      localStorage.removeItem('accessToken');
      set({ isAuthenticated: false, user: null });
    },
  };
});

import { create } from 'zustand';
import { decodeToken } from '../utils/jwtHelper';
import api from '../api/axios';

export const useAuthStore = create((set) => {

  return {
    token: localStorage.getItem('token'),
    user: decodeToken(localStorage.getItem('token')), 
    isAuthenticated: !!decodeToken(localStorage.getItem('token')),
    error: null,

    setError: (error) => set({ error }),

    login: async (username, password) => {
      try {
        const response = await api.post('/auth/login', { username, password });
        const { token } = response.data;

        localStorage.setItem('token', token);
        const user = decodeToken(token);

        set({
          token,
          user,
          isAuthenticated: true,
          error: null
        });

        return true;
      } catch (error) {
        console.error(error);
        set({
          error: error.response?.data?.msg || 'Error al iniciar sesión',
        });
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      set({ token: null, user: null, isAuthenticated: false, error: null });
    }
  };
});
import { create } from 'zustand';
import api from '../api/axios';
import { decodeToken } from '../utils/jwtHelper';

export const useAuthStore = create((set) => ({

  token: localStorage.getItem('token'),
  user: decodeToken(localStorage.getItem('token')),
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
  isInitialized: true,

  // Iniciar sesion
  login: async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);

      set({
        token,
        user: user,
        isAuthenticated: true,
        error: null
      });
    } catch (error) {
      console.error(error);
      set({
        error: error.response?.data?.message || 'Error al iniciar sesión'
      });
    }
  },

  // Cerrar sesion
  logout: () => {
    localStorage.removeItem('token');
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null
    });
  },

  checkSystem: async () => {
    try {
      const res = await api.get('/auth/status');

      set({ isInitialized: res.data.initialized });

      return res.data.initialized;
    } catch (error) {
      console.error("Error verificando estado del sistema:", error);
      // En caso de error, asumimos true para no trabar la app en setup
      return true;
    }
  },

  // Pedir el mail de recuperacion
  requestPasswordReset: async (email) => {
    try {
      await api.post('/auth/forgot-password', { email });
      return { success: true, message: 'Correo enviado. Revisa tu bandeja de entrada.' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.msg || 'Error al enviar la solicitud.'
      };
    }
  },

  // Restablecer la contraseña (usando el token)
  confirmPasswordReset: async (token, newPassword) => {
    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword });
      return { success: true, message: 'Contraseña actualizada correctamente.' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.msg || 'El enlace es inválido o ha expirado.'
      };
    }
  }

}));
import { create } from 'zustand';
import api from '../api/axios';

export const useUserStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true });
        try {
            const res = await api.get('/usuarios');
            set({ users: res.data, loading: false });
        } catch (error) {
            console.error(error);
            set({ error: 'Error cargando usuarios', loading: false });
        }
    },

    createUser: async (userData) => {
        set({ loading: true });
        try {
            const res = await api.post('/usuarios', userData);
            set((state) => ({
                users: [...state.users, res.data],
                loading: false
            }));
            return true;
        } catch (error) {
            console.error(error);
            set({ error: error.response?.data?.message || 'Error al crear', loading: false });
            return false;
        }
    },

    updateUser: async (id, userData) => {
        set({ loading: true });
        try {
            const res = await api.put(`/usuarios/${id}`, userData);
            set((state) => ({
                users: state.users.map(u => u.id_user === id ? { ...u, ...res.data } : u),
                loading: false
            }));
            return true;
        } catch (error) {
            console.error(error);
            set({ error: 'Error al actualizar', loading: false });
            return false;
        }
    },

    deleteUser: async (id) => {
        try {
            await api.delete(`/usuarios/${id}`);
            set((state) => ({
                users: state.users.filter(u => u.id_user !== id)
            }));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}));

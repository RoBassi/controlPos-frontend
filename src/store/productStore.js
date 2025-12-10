import { create } from 'zustand';
import api from '../api/axios';

export const useProductStore = create((set, get) => ({
    products: [],
    categories: [],
    loading: false,
    error: null,

    // Cargar datos iniciales
    fetchData: async () => {
        set({ loading: true });
        try {
            // Asumo que tus rutas en backend son /productos y /categorias
            const [productsRes, categoriesRes] = await Promise.all([
                api.get('/productos'),
                api.get('/categorias')
            ]);
            set({
                products: productsRes.data,
                categories: categoriesRes.data,
                loading: false
            });
        } catch (error) {
            console.error(error);
            set({ error: 'Error cargando datos', loading: false });
        }
    },

    // Crear o Editar
    saveProduct: async (productData) => {
        set({ loading: true });
        try {
            if (productData.id_product) {
                // ACTUALIZAR (PUT)
                const res = await api.put(`/productos/${productData.id_product}`, productData);
                set((state) => ({
                    products: state.products.map(p =>
                        p.id_product === productData.id_product ? res.data : p
                    )
                }));
            } else {
                // CREAR (POST)
                const res = await api.post('/productos', productData);
                set((state) => ({ products: [...state.products, res.data] }));
            }
            set({ loading: false });
            return true; // Éxito
        } catch (error) {
            console.error(error);
            set({ error: error.response?.data?.message || 'Error al guardar', loading: false });
            return false;
        }
    },

    // Eliminar
    deleteProduct: async (id_product) => {
        try {
            await api.delete(`/productos/${id_product}`);
            set((state) => ({
                products: state.products.filter(p => p.id_product !== id_product)
            }));
        } catch (error) {
            console.error("Error al eliminar", error);
        }
    },

    createCategory: async (nombre) => {
        set({ loading: true });
        try {
            // Asumimos que el body espera { nombre: "Bebidas" }
            const res = await api.post('/categorias', { nombre });

            // Actualizamos el estado local agregando la nueva categoría al array existente
            set((state) => ({
                categories: [...state.categories, res.data],
                loading: false
            }));
            return true; // Éxito
        } catch (error) {
            console.error(error);
            set({
                error: error.response?.data?.message || 'Error al crear categoría',
                loading: false
            });
            return false;
        }
    }
})); 
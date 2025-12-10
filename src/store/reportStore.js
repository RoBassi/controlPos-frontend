import { create } from 'zustand';
import api from '../api/axios';

export const useReportStore = create((set) => ({
    sales: [],
    stats: { global: {}, byCategory: [] },
    loading: false,
    saleDetails: [], // Para el modal
    dashboardData: {
        todayStats: {},
        lastWeekSales: []
    },
    
    // Obtener reporte por fechas
    fetchReports: async (from, to) => {
        set({ loading: true });
        try {
            // Enviamos fechas como string YYYY-MM-DD
            const res = await api.get(`/ventas/reportes?from=${from}&to=${to}`);
            set({ 
                sales: res.data.sales, 
                stats: res.data.stats, 
                loading: false 
            });
        } catch (error) {
            console.error("Error fetching reports", error);
            set({ loading: false });
        }
    },

    // Obtener detalle de una venta
    fetchSaleDetails: async (id) => {
        try {
            const res = await api.get(`/ventas/${id}`);
            set({ saleDetails: res.data });
        } catch (error) {
            console.error(error);
        }
    },
    
    clearDetails: () => set({ saleDetails: [] }),

    loadDashboard: async () => {
        try {
            // 1. Fechas para "HOY"
            const now = new Date();
            const todayStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD local
            
            // 2. Fechas para "Últimos 7 días" (Para el gráfico)
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 6);
            const weekAgoStr = weekAgo.toLocaleDateString('en-CA');

            // Hacemos dos peticiones en paralelo
            const [todayRes, weekRes] = await Promise.all([
                api.get(`/ventas/reportes?from=${todayStr}&to=${todayStr}`),
                api.get(`/ventas/reportes?from=${weekAgoStr}&to=${todayStr}`)
            ]);

            set({
                dashboardData: {
                    todayStats: todayRes.data.stats.global,
                    lastWeekSales: weekRes.data.sales // Guardamos las ventas individuales para procesarlas en el gráfico
                }
            });

        } catch (error) {
            console.error("Error loading dashboard", error);
        }
    }
}));
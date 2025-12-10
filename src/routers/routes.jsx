import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage, 
        ProductPage,
        UsersPage,
        ReportsPage,
        PosPage } from "../pages";
import { useAuthStore } from '../store/authStore';

export function MyRoutes() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'administrador';

  return (
    <Routes>

       {/* Rutas exclusivas de Admin */}
       {isAdmin && (
         <>
           <Route path="/" element={<DashboardPage />} />
           <Route path="/usuarios" element={<UsersPage />} />
           <Route path="/reportes" element={<ReportsPage />} />
         </>
       )}
       
       {/* Rutas para Cajero y Admin */}
       <Route path="/productos" element={<ProductPage />} />
       <Route path="/ventas" element={<PosPage />} />

       {/*
           - Si es Admin, va al Dashboard
           - Si es Cajero, va a Ventas
       */}
       <Route path="*" element={<Navigate to={isAdmin ? "/" : "/ventas"} replace />} />
    </Routes>
  );
}

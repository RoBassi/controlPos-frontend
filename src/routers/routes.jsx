import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// Importamos las páginas
import { 
    DashboardPage, 
    ProductPage, 
    UsersPage, 
    ReportsPage, 
    PosPage 
} from "../pages";

import ResetPasswordPage from '../pages/ResetPasswordPage';
import { LoginForm } from '../components/auth/LoginForm'; 

export function MyRoutes() {
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = user?.role === 'administrador';

  return (
    <Routes>
       {/* --- RUTAS PÚBLICAS --- */}
       
       {/* 1. Login: 
           - Si ya está logueado -> Lo mandamos adentro (a Ventas o Dashboard).
           - Si NO está logueado -> Le mostramos el formulario de Login.
       */}
       <Route path="/login" element={
           isAuthenticated ? (
               <Navigate to={isAdmin ? "/" : "/ventas"} replace />
           ) : (
               <ContainerLogin><LoginForm /></ContainerLogin>
           )
       } />

       {/* 2. Recuperar Contraseña: SIEMPRE accesible (pública) */}
       <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
       

       {/* --- RUTAS PRIVADAS (Requieren Login) --- */}
       
       {isAdmin && (
         <>
           <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
           <Route path="/usuarios" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
           <Route path="/reportes" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
         </>
       )}
       
       {/* Rutas compartidas (Cajero y Admin) */}
       <Route path="/productos" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
       <Route path="/ventas" element={<PrivateRoute><PosPage /></PrivateRoute>} />

       {/* Catch-all: Si la ruta no existe o no tiene permiso */}
       <Route path="*" element={<Navigate to={isAuthenticated ? (isAdmin ? "/" : "/ventas") : "/login"} replace />} />
    </Routes>
  );
}

// --- COMPONENTE DE PROTECCIÓN ---
// Si no está autenticado, lo patea al Login. Si sí, muestra la página.
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// --- ESTILO PARA CENTRAR EL LOGIN ---
// (Como movimos el Login aquí, necesitamos este contenedor para que se vea centrado)
const ContainerLogin = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal || '#f5f5f5'};
`;
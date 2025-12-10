import { v } from "../styles/variables";

// MENU DE USUARIO (Perfil, Salir)
export const DesplegableUser = [
  {
    text: "Mi perfil",
    icon: "lucide:user", 
    tipo: "miperfil",
  },
  {
    text: "Cerrar sesión",
    icon: "lucide:log-out",
    tipo: "cerrarsesion",
  },
];

// SIDEBAR LINKS (Principal)
export const LinksArray = [
  {
    label: "Dashboard",
    icon: "lucide:layout-dashboard",
    to: "/",
    roles: ["administrador"], 
  },
  {
    label: "Ventas",
    icon: "lucide:receipt-text",
    to: "/ventas",
    roles: ["administrador", "cajero"], 
  },
  {
    label: "Stock",
    icon: "lucide:boxes",
    to: "/productos",
    roles: ["administrador", "cajero"], 
  },
];

// SIDEBAR LINKS (Secundario)
export const SecondarylinksArray = [
  {
    label: "Usuarios",
    icon: "lucide:person-standing",
    to: "/usuarios",
    roles: ["administrador"], 
  },
  {
    label: "Reportes",
    icon: "lucide:bar-chart-4",
    to: "/reportes",
    roles: ["administrador"], 
  },
];

// TEMAS (Data para selectores)
export const TemasData = [
  {
    icon: "lucide:sun", 
    descripcion: "light",
  },
  {
    icon: "lucide:moon", 
    descripcion: "dark",
  },
]; 

// TIPOS DE USUARIO (Roles)
export const TipouserData = [
  {
    descripcion: "Cajero",
    icon: "lucide:user", 
  },
  {
    descripcion: "Administrador",
    icon: "lucide:shield-check", 
  },
];

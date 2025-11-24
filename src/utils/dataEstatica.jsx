import { v } from "../styles/variables";
import {
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";

// MENU DE USUARIO (Perfil, Configuración, Salir)
export const DesplegableUser = [
  {
    text: "Mi perfil",
    icon: "lucide:user", 
    tipo: "miperfil",
  },
  {
    text: "Configuración",
    icon: "lucide:settings",
    tipo: "configuracion",
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
  },
  {
    label: "Ventas",
    icon: "lucide:receipt-text", 
    to: "/ventas",
  },
  {
    label: "Stock",
    icon: "lucide:boxes",
    to: "/stock",
  },
  /*{
    label: "Clientes",
    icon: "lucide:users",
    to: "/clientes",
  },*/
];

// SIDEBAR LINKS (Secundario)
export const SecondarylinksArray = [
  {
    label: "Ajustes",
    icon: "lucide:settings-2", 
    to: "/ajustes",
  },
  {
    label: "Reportes",
    icon: "lucide:bar-chart-4", 
    to: "/reportes",
  },
];

// TEMAS (Data para selectores o lógica)
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

// MÓDULOS DE CONFIGURACIÓN
export const DataModulosConfiguracion = [
  {
    title: "Productos",
    subtitle: "Registra tus productos",
    icon: "lucide:package", 
    link: "/configurar/productos",
  },
  {
    title: "Personal",
    subtitle: "Control de personal",
    icon: "lucide:users-round", 
    link: "/configurar/usuarios",
  },
  {
    title: "Tu empresa",
    subtitle: "Opciones generales",
    icon: "lucide:building-2", 
    link: "/configurar/empresa",
  },
  {
    title: "Categorías",
    subtitle: "Asigna categorías",
    icon: "lucide:tags",
    link: "/configurar/categorias",
  },
  {
    title: "Marcas",
    subtitle: "Gestiona marcas",
    icon: "lucide:medal",
    link: "/configurar/marca",
  },
];

// TIPOS DE USUARIO (Roles)
export const TipouserData = [
  {
    descripcion: "Empleado",
    icon: "lucide:user", 
  },
  {
    descripcion: "Administrador",
    icon: "lucide:shield-check", 
  },
];

// TIPOS DE DOCUMENTO
export const TipoDocData = [
  {
    descripcion: "DNI",
    icon: "lucide:id-card", 
  },
  {
    descripcion: "Pasaporte / Otro",
    icon: "lucide:book-user", 
  },
  {
    descripcion: "Otros",
    icon: "lucide:file-question", 
  },
];
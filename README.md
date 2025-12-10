# ControlPOS - Frontend

**ControlPOS** es una aplicación de Punto de Venta (POS) moderna, rápida y escalable diseñada para la gestión ágil de ventas, inventario y usuarios. Construida con **React** y **Vite**, destaca por su arquitectura modular y su **Sistema de Diseño Flat** personalizado.

## Características Principales

### Punto de Venta (POS)
- **Interfaz Ágil:** Diseñada para minimizar clics. Compatible con lectores de código de barras.
- **Carrito Reactivo:** Cálculos automáticos de totales y stock en tiempo real.
- **Cobro Simplificado:** Modal de pago inteligente con cálculo automático de vueltos y validación de montos.
- **Diseño Visual:** Botones grandes y claros para acciones críticas (Cobrar, Eliminar).

### Gestión de Inventario
- **ABM de Productos:** Creación y edición con validaciones.
- **Control de Stock:** Alertas visuales para bajo stock.
- **Categorización:** Organización por rubros.

### Reportes y Métricas
- **Filtros Flexibles:** Búsqueda por "Hoy", "Este Mes" o rangos personalizados.
- **Ranking de Ventas:** Desglose por Vendedor y por Categoría.
- **Historial Detallado:** Vista profunda de cada ticket y sus ítems.

### Seguridad y Usuarios
- **Roles y Permisos:** Menú lateral adaptativo (Admin vs. Cajero).
- **Autenticación JWT:** Persistencia de sesión segura.
- **Gestión de Usuarios:** CRUD completo de personal.

---

## Stack Tecnológico

La aplicación sigue una arquitectura **Feature-based** con separación de responsabilidades (UI, Lógica, Datos).

* **Core:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Estilos:** [Styled Components](https://styled-components.com/) (CSS-in-JS con Temas Light/Dark)
* **Estado Global:** [Zustand](https://github.com/pmndrs/zustand) (Persistencia local para Auth y Theme)
* **Enrutamiento:** [React Router DOM](https://reactrouter.com/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Iconos:** [Iconify](https://iconify.design/) (Colección Lucide)
* **Utilidades:** React Datepicker, JWT Decode.

---

## Sistema de Diseño (UI Kit)

Se ha implementado un **Design System** propio basado en componentes reutilizables y un estilo "minimalista" para maximizar la legibilidad y el rendimiento.

## Estructura del Proyecto

```text
src/
├── api/             # Configuración de Axios e interceptores
├── components/
│   ├── ui/          # UI Kit Genérico (Button, Input, Card)
│   ├── layout/      # Estructura (Sidebar, TopBar)
│   ├── pos/         # Componentes específicos del POS
│   ├── products/    # Modales de inventario
│   ├── users/       # Modales de usuarios
│   └── auth/        # Login Form
├── pages/           # Vistas principales (PosPage, ReportsPage, etc.)
├── store/           # Lógica de negocio (Zustand Stores)
├── styles/          # Temas (Light/Dark) y Estilos Globales
└── utils/           # Constantes y Helpers
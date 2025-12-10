// PALETA DEFINIDA POR EL USUARIO
const PALETTE = {
    primary:    '#1E88E5', // Azul petróleo
    secondary:  '#F57C00', // Naranja suave
    success:    '#43A047', // Verde esmeralda
    warning:    '#FBC02D', // Amarillo mostaza
    error:      '#E53935', // Rojo suave
    
    bgLight:    '#F5F5F5', // Gris muy claro (Fondo App)
    bgCard:     '#FFFFFF', // Blanco (Tarjetas)
    
    textMain:   '#212121', // Gris oscuro
    textSec:    '#616161', // Gris medio
    
    border:     '#E0E0E0', // Gris suave para bordes
};

export const Light = {
    // Colores Principales
    primary: PALETTE.primary,
    secondary: PALETTE.secondary,
    
    // Estados
    colorSuccess: PALETTE.success,
    colorWarning: PALETTE.warning,
    colorError: PALETTE.error,

    // Fondos
    bgtotal: PALETTE.bgLight, // Fondo de la pantalla
    bgcards: PALETTE.bgCard,  // Fondo de tarjetas/modales
    bg: PALETTE.bgCard,       // Alias para inputs
    
    // Textos
    text: PALETTE.textMain,
    colorSubtitle: PALETTE.textSec,
    
    // Bordes y Elementos UI neutros
    bg2: PALETTE.border,      // Usado para bordes de inputs/tablas
    bg3: '#F0F0F0',           // Un gris un poco más oscuro para hovers
    
    // Scrollbar y otros
    colorScroll: '#BDBDBD',
    
    // Variables heredadas (mantener compatibilidad)
    bgtgderecha: '#FAFAFA',
    bgAlpha: 'rgba(30, 136, 229, 0.1)', // Azul primario transparente
};

// Mapeo Dark Mode (Invertimos lógicamente para cuando quieras usarlo)
export const Dark = {
    primary: PALETTE.primary, // El azul suele verse bien en oscuro también
    secondary: PALETTE.secondary,
    colorSuccess: '#66BB6A', // Un verde un poco más claro para contraste
    colorWarning: '#FFF176',
    colorError: '#EF5350',

    bgtotal: '#121212', // Fondo oscuro estándar
    bgcards: '#1E1E1E', // Tarjetas gris oscuro
    bg: '#2C2C2C',      // Inputs
    
    text: '#E0E0E0',    // Texto casi blanco
    colorSubtitle: '#A0A0A0',
    
    bg2: '#424242',     // Bordes oscuros
    bg3: '#333333',
    
    colorScroll: '#424242',
    bgtgderecha: '#212121',
    bgAlpha: 'rgba(30, 136, 229, 0.2)',
};
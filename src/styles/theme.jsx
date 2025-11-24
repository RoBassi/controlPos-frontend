import { css } from 'styled-components';

// Paleta base para referencia
const PALETTE = {
    PRIMARY: '#1E88E5', // Azul petróleo
    ACCENT: '#F57C00',  // Naranja suave
    SUCCESS: '#43A047', // Verde esmeralda
    WARNING: '#FBC02D', // Amarillo mostaza
    ERROR: '#E53935',   // Rojo suave
    BG_LIGHT: '#F5F5F5', // Gris muy claro
    TEXT_DARK: '#212121', // Gris oscuro
    TEXT_MEDIUM: '#616161', // Gris medio
    WHITE: '#FFFFFF',
};


export const Light = {
    // Colores basados en la paleta
    colorPrimary: PALETTE.PRIMARY, // Azul Petróleo
    colorAccent: PALETTE.ACCENT,   // Naranja suave
    colorSuccess: PALETTE.SUCCESS, // Éxito
    colorWarning: PALETTE.WARNING, // Advertencia
    colorError: PALETTE.ERROR,     // Error

    // Fondo y Texto del tema claro
    body: PALETTE.BG_LIGHT, // Fondo principal: Gris muy claro
    text: PALETTE.TEXT_DARK, // Texto principal: Gris oscuro
    colorSubtitle: PALETTE.TEXT_MEDIUM, // Texto secundario: Gris medio
    bgcards: PALETTE.WHITE, // Fondo de tarjetas: Blanco

    // Variables derivadas y RGBA
    bodyRgba: "245, 245, 245", // Rgba de BG_LIGHT
    textRgba: "33, 33, 33",    // Rgba de TEXT_DARK
    rgbafondoanimado: "rgba(33, 33, 33, 0.05)", // Oscuro muy transparente
    bg: PALETTE.BG_LIGHT,
    bgAlpha: "#F2F2F2", // Ligeramente más oscuro que BG_LIGHT
    bg2: "#E0E0E0", // Gris para contraste
    bg3: PALETTE.WHITE,
    primary: PALETTE.PRIMARY,
    bg4: "#eaeaea",
    bgtgderecha: "#eeeeee",
    bgtotal: "#EDF3FB", // Mantenido, asumo que es para un área específica.
    colorToggle: PALETTE.ACCENT, // Color del interruptor: Naranja
    
    // Colores de componentes antiguos mapeados
    colortitlecard: PALETTE.TEXT_DARK, 
    colorsubtitlecard: PALETTE.TEXT_MEDIUM,
    color1: PALETTE.PRIMARY, 
    color2: "#E5E5E5",
    whiteBg: PALETTE.ACCENT, // Naranja
    
    // Dimensiones y otros
    carouselColor: "#9955ff",
    fontxs: "0.75em",
    fontsm: "0.875em",
    fontmd: "1em",
    font16px: "16px",
    fontlg: "1.25em",
    fontxl: "2em",
    fontxxl: "3em",
    fontxxxl: "4em",
    fontButton: "0.875em",
    navHeight: "5rem",
    bg5: "#84d8ff",
    bg6: "rgba(132, 216, 255, 0.3)",
    translateToggle: "-12px",
    logorotate: "360deg",
    slideroffset: "0.3em",
    sizeoficon: "1.4em",
    colorScroll: "#cac9ca",
};


export const Dark = {
    // Colores basados en la paleta (Dark mode usa texto blanco y fondo oscuro)
    colorPrimary: PALETTE.PRIMARY,
    colorAccent: PALETTE.ACCENT,
    colorSuccess: PALETTE.SUCCESS,
    colorWarning: PALETTE.WARNING,
    colorError: PALETTE.ERROR,

    // Fondo y Texto del tema oscuro
    body: "#121212", // Fondo principal: Gris muy oscuro (Estándar Dark Mode)
    text: PALETTE.WHITE, // Texto principal: Blanco
    colorSubtitle: "#A9A9A9", // Texto secundario: Gris claro
    bgcards: "#1E1E1E", // Fondo de tarjetas: Gris oscuro (contraste con el fondo)

    // Variables derivadas y RGBA
    bodyRgba: "18, 18, 18", // Rgba de fondo oscuro
    textRgba: "255, 255, 255", // Rgba de blanco
    rgbafondoanimado: "rgba(255, 255, 255, 0.05)", // Blanco muy transparente
    bg: "#121212",
    bgAlpha: "rgba(0,0,0,.5)",
    bg2: "#282828", // Gris para contraste
    bg3: "#1E1E1E", // Coincide con tarjetas
    primary: PALETTE.PRIMARY,
    bg4: "#4E4E50",
    bgtgderecha: "#21252B",
    bgtotal: "#131F24",
    colorToggle: PALETTE.PRIMARY, // Color del interruptor: Azul Primario
    
    // Colores de componentes antiguos mapeados
    colortitlecard: "#F0F0F0", 
    colorsubtitlecard: "#A9A9A9",
    color1: PALETTE.PRIMARY, 
    color2: "#37464F",
    whiteBg: PALETTE.ACCENT, // Naranja
    
    // Dimensiones y otros
    carouselColor: "#9955ff",
    fontxs: "0.75em",
    fontsm: "0.875em",
    fontmd: "1em",
    font16px: "16px",
    fontlg: "1.25em",
    fontxl: "2em",
    fontxxl: "3em",
    fontxxxl: "4em",
    fontButton: "0.875em",
    navHeight: "5rem",
    bg5: "#84d8ff",
    bg6: "rgba(132, 216, 255, 0.1)",
    translateToggle: "26px",
    logorotate: "-360deg",
    slideroffset: "0.3em",
    sizeoficon: "1.4em",
    colorScroll: "#434343",
};
//import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useThemeStore } from "../../store/ThemeStore";

export function ToggleTema() {
  const { theme, setTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <Container>
      <button className="toggle-btn" onClick={setTheme} aria-label="Cambiar tema">
        {/* Lógica visual:
           Si es Dark mode -> Muestra el Sol (para cambiar a Light)
           Si es Light mode -> Muestra la Luna (para cambiar a Dark)
        */}
        <div className={`icon-wrapper ${isDark ? "show-sun" : "show-moon"}`}>
            <Icon icon="lucide:sun" className="icon sun" />
            <Icon icon="lucide:moon" className="icon moon" />
        </div>
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Espacio superior */
  margin-bottom: 20px; /* Espacio inferior por si acaso */

  .toggle-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden; /* Para ocultar el icono que sale */
    
    /* Color base del icono */
    color: ${({ theme }) => theme.textPrimary || theme.text}; 

    &:hover {
      background-color: ${({ theme }) => theme.bgHover};
      color: ${({ theme }) => theme.textPrimary}; /* Color al pasar el mouse */
    }
  }

  .icon-wrapper {
    position: relative;
    width: 24px;
    height: 24px;
  }

  .icon {
    font-size: 24px;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* --- Animación de Entrada/Salida --- */

  .show-sun .sun {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  .show-sun .moon {
    transform: translateY(20px) rotate(90deg); /* Sale hacia abajo */
    opacity: 0;
  }

  /* Estado: Mostrar LUNA (estamos en Light mode) */
  .show-moon .moon {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  .show-moon .sun {
    transform: translateY(-20px) rotate(-90deg); /* Sale hacia arriba */
    opacity: 0;
  }
`;
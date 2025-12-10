import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useThemeStore } from "../../store";

export function ThemeToggle({ isOpen }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Container onClick={toggleTheme} $isOpen={isOpen}>
      <Icon 
        icon={theme === "light" ? "lucide:moon" : "lucide:sun"} 
        width="22" 
      />
      
      {isOpen && (
          <span className="label">
              {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
          </span>
      )}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: transparent;
  border: 1px solid ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.1s;
  
  /* Si el sidebar está abierto, el botón se estira */
  width: ${({ $isOpen }) => $isOpen ? "80%" : "45px"};
  
  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }

  .label {
      margin-left: 10px;
      font-weight: 600;
      font-size: 0.9rem;
  }
`;
import React from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { Icon } from "@iconify/react";
import { ThemeToggle } from "./ThemeToggle";
import { LinksArray, SecondarylinksArray } from "../../utils/constants";
import { v } from "../../styles/variables";
import { useAuthStore } from '../../store';

export function Sidebar({ state, setState }) {
  const { user } = useAuthStore();
  const userRole = user?.role || "invitado";

  const filterByRole = (links) => links.filter(link => link.roles.includes(userRole));
  const visibleLinks = filterByRole(LinksArray);
  const visibleSecondaryLinks = filterByRole(SecondarylinksArray);

  return (
    <Container className={state ? "active" : ""}>
        <div className="Logocontent">
          <div className="imgcontent" onClick={setState}>
            <img src={v.logo} alt="Logo" />
          </div>
          <h2>ControlPOS</h2>
        </div>

        {visibleLinks.map(({ icon, label, to }) => (
          <div className="LinkContainer" key={label}>
            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
              <div className="Linkicon"><Icon icon={icon} /></div>
              <span className="label_ver">{label}</span>
            </NavLink>
          </div>
        ))}

        {visibleSecondaryLinks.length > 0 && <Divider />}

        {visibleSecondaryLinks.map(({ icon, label, to }) => (
          <div className="LinkContainer" key={label}>
            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
              <div className="Linkicon"><Icon icon={icon} /></div>
              <span className="label_ver">{label}</span>
            </NavLink>
          </div>
        ))}

        <ThemeToggleContainer>
             <ThemeToggle isOpen={state} />
        </ThemeToggleContainer>
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.bgcards};
  color: ${(props) => props.theme.text};
  position: fixed; left: 0; top: 0; height: 100vh; z-index: 100;
  width: 88px; 
  border-right: 1px solid ${({ theme }) => theme.bg2};
  padding-top: 20px;
  transition: width 0.2s ease; 
  overflow-x: hidden;

  &.active { width: 250px; }

  .Logocontent {
    display: flex; align-items: center; justify-content: center;
    padding-bottom: 30px; margin-bottom: 10px;
    
    .imgcontent {
      width: 40px; cursor: pointer;
      img { 
        width: 100%; 
      }
    }
    h2 {
      display: none; font-size: 1.2rem; font-weight: 800; margin-left: 10px;
      color: ${({ theme }) => theme.primary};
    }
  }
  
  &.active .Logocontent h2 { display: block; }

  .LinkContainer { margin: 4px 10px; }

  .Links {
    display: flex; align-items: center; height: 45px; text-decoration: none;
    border-radius: 6px;
    color: ${({ theme }) => theme.colorSubtitle};
    justify-content: center; /* Centrado cuando está cerrado */
    transition: background-color 0.1s; /* Transición muy rápida */

    .Linkicon { font-size: 22px; display: flex; align-items: center; }
    .label_ver { display: none; margin-left: 15px; font-weight: 600; font-size: 0.9rem; white-space: nowrap; }

    &:hover {
      background-color: ${({ theme }) => theme.bgtotal};
      color: ${({ theme }) => theme.text};
    }

    &.active {
      background-color: ${({ theme }) => theme.primary}15;
      color: ${({ theme }) => theme.primary};
    }
  }

  &.active .Links {
    justify-content: flex-start; padding-left: 15px;
    .label_ver { display: block; }
  }
`;

const Divider = styled.div`
  height: 1px; width: 80%; background: ${({ theme }) => theme.bg2}; margin: 15px auto;
`;

const ThemeToggleContainer = styled.div`
    display: flex; justify-content: center; margin-top: auto; margin-bottom: 20px;
`;
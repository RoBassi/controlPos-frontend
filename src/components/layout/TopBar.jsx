import React from 'react';
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../../store/authStore";

export function TopBar() {
  const { user, logout } = useAuthStore();

  return (
    <Container>
       <Brand>
          <span>CONTROL</span>POS
       </Brand>

       <UserSection>
          <div className="user-info">
              <span className="name">{user?.username || "Usuario"}</span>
              <span className="role">{user?.role || "Invitado"}</span>
          </div>

          <AvatarCircle>
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </AvatarCircle>
          
          <div className="divider"></div>

          <LogoutButton onClick={logout} title="Cerrar Sesión">
              <Icon icon="lucide:log-out" width="20" />
          </LogoutButton>
       </UserSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 70px;
  
  background-color: ${({ theme }) => theme.bgcards}; 
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.bg2};
  position: relative; 
`;

const Brand = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); 
    
    font-size: 1.4rem;
    font-weight: 800;
    color: ${({ theme }) => theme.text};
    letter-spacing: 0.5px;
    
    span { color: ${({ theme }) => theme.primary}; } 
`;

const UserSection = styled.div`
  display: flex; align-items: center; gap: 15px;
  margin-left: auto;

  .user-info {
    display: flex; flex-direction: column; align-items: flex-end;
    .name { font-weight: 700; font-size: 0.9rem; color: ${({ theme }) => theme.text}; }
    .role { font-size: 0.75rem; color: ${({ theme }) => theme.colorSubtitle}; text-transform: capitalize; }
  }

  .divider {
      width: 1px; height: 25px; background-color: ${({ theme }) => theme.bg2};
  }
`;

const AvatarCircle = styled.div`
    width: 38px; height: 38px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary}15;
    color: ${({ theme }) => theme.primary};
    display: flex; justify-content: center; align-items: center;
    font-weight: 700; font-size: 1.1rem;
    border: 1px solid ${({ theme }) => theme.primary}30;
`;

const LogoutButton = styled.button`
    background: transparent; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    padding: 8px; border-radius: 6px;
    color: ${({ theme }) => theme.colorSubtitle};
    transition: all 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.colorError}15; 
        color: ${({ theme }) => theme.colorError};
    }
`;
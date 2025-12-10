import React from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/authStore';

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <Container>
      <WelcomeBox>
        <h1>¡Bienvenido a ControlPOS</h1>
        <h1>{user?.username || 'Usuario'}!</h1>
      </WelcomeBox>
    </Container>
  );
};

export default DashboardPage;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const WelcomeBox = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text};
  
  .icon-bg {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.bgcards}; 
      border: 1px solid ${({ theme }) => theme.bg2};
      color: ${({ theme }) => theme.primary};
      margin-bottom: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }

  h1 {
      font-size: 2.5rem;
      margin: 0 0 10px 0;
      font-weight: 800;
  }

  p {
      font-size: 1.1rem;
      color: ${({ theme }) => theme.colorSubtitle};
      margin: 0;
  }

  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
  }
`;
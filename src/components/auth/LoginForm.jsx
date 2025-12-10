import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../../store/authStore';
import { Button, Input, Card } from '../ui';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(username, password);
    setLoading(false);
  };

  return (
    <LoginContainer>
      <Card className="login-card">
        <div className="header">
          <h2>Bienvenido</h2>
          <p>Ingresa a ControlPOS</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input 
            label="Usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input 
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </Card>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;

  .login-card {
    padding: 40px; 
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
    h2 { margin: 0; font-size: 1.8rem; color: ${({ theme }) => theme.text}; }
    p { color: ${({ theme }) => theme.colorSubtitle}; margin-top: 5px; }
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colorError}20;
  color: ${({ theme }) => theme.colorError};
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
`;
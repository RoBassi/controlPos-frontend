import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../../store/authStore';
import { Button, Input, Card } from '../ui';

export const LoginForm = () => {
  // Estado para saber si mostrar login o recovery
  const [view, setView] = useState('login'); 
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' }); 

  const { login, requestPasswordReset, error: loginError } = useAuthStore();

  // Limpiar mensajes al cambiar de vista
  const switchView = (v) => {
      setView(v);
      setMsg({ text: '', type: '' });
      setEmail('');
      setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(username, password);
    setLoading(false);
  };

  const handleRecovery = async (e) => {
      e.preventDefault();
      if (!email) return;
      setLoading(true);
      const res = await requestPasswordReset(email);
      setLoading(false);
      
      setMsg({ 
          text: res.message, 
          type: res.success ? 'success' : 'error' 
      });
  };

  return (
    <LoginContainer>
      <Card className="login-card">
        
        {view === 'login' && (
            <>
                <div className="header">
                    <h2>Bienvenido</h2>
                    <p>Ingresa a ControlPOS</p>
                </div>

                <form onSubmit={handleLogin}>
                    <Input 
                        label="Usuario" name="username" 
                        value={username} onChange={(e) => setUsername(e.target.value)} required 
                    />
                    <Input 
                        label="Contraseña" name="password" type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required 
                    />

                    {loginError && <Message $type="error">{loginError}</Message>}

                    <div style={{textAlign: 'right', marginBottom: '15px'}}>
                        <LinkBtn type="button" onClick={() => switchView('recovery')}>
                            ¿Olvidaste tu contraseña?
                        </LinkBtn>
                    </div>

                    <Button type="submit" disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </Button>
                </form>
            </>
        )}

        {view === 'recovery' && (
            <>
                <div className="header">
                    <h2>Recuperar Cuenta</h2>
                    <p>Ingresa tu email para recibir un enlace</p>
                </div>

                <form onSubmit={handleRecovery}>
                    <Input 
                        label="Correo Electrónico" name="email" type="email" placeholder="ejemplo@correo.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus
                    />

                    {msg.text && <Message $type={msg.type}>{msg.text}</Message>}

                    <Button type="submit" disabled={loading} style={{ width: '100%', marginBottom: '10px' }}>
                        {loading ? 'Enviando...' : 'Enviar Enlace'}
                    </Button>

                    <Button type="button" $variant="outline" onClick={() => switchView('login')} style={{ width: '100%' }}>
                        Volver al Login
                    </Button>
                </form>
            </>
        )}

      </Card>
    </LoginContainer>
  );
};

// --- ESTILOS ---
const LoginContainer = styled.div`
  width: 100%; max-width: 400px; padding: 20px;
  .login-card { padding: 40px; }
  .header {
    text-align: center; margin-bottom: 30px;
    h2 { margin: 0; font-size: 1.8rem; color: ${({ theme }) => theme.text}; }
    p { color: ${({ theme }) => theme.colorSubtitle}; margin-top: 5px; }
  }
`;

const Message = styled.div`
  background-color: ${({ theme, $type }) => $type === 'error' ? theme.colorError + '20' : theme.colorSuccess + '20'};
  color: ${({ theme, $type }) => $type === 'error' ? theme.colorError : theme.colorSuccess};
  padding: 10px; border-radius: 6px; margin-bottom: 15px; text-align: center; font-size: 0.9rem; font-weight: 600;
`;

const LinkBtn = styled.button`
    background: none; border: none; cursor: pointer;
    color: ${({theme}) => theme.primary}; font-size: 0.9rem; font-weight: 600;
    &:hover { text-decoration: underline; }
`;
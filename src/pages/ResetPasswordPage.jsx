import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button, Input, Card } from '../components/ui';

const ResetPasswordPage = () => {
    const { token } = useParams(); // Obtenemos el token de la URL
    const navigate = useNavigate();
    const { confirmPasswordReset } = useAuthStore();

    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (pass !== confirm) {
            setMsg({ text: 'Las contraseñas no coinciden', type: 'error' });
            return;
        }
        if (pass.length < 6) {
            setMsg({ text: 'Mínimo 6 caracteres', type: 'error' });
            return;
        }

        setLoading(true);
        const res = await confirmPasswordReset(token, pass);
        setLoading(false);

        setMsg({ text: res.message, type: res.success ? 'success' : 'error' });

        if (res.success) {
            setTimeout(() => navigate('/login'), 3000); // Redirigir al login
        }
    };

    return (
        <Container>
            <ResetCard>
                <div className="header">
                    <h2>Nueva Contraseña</h2>
                    <p>Ingresa tu nueva contraseña</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input 
                        label="Nueva Contraseña" type="password"
                        value={pass} onChange={e => setPass(e.target.value)} required 
                    />
                    <Input 
                        label="Confirmar Contraseña" type="password"
                        value={confirm} onChange={e => setConfirm(e.target.value)} required 
                    />

                    {msg.text && <Message $type={msg.type}>{msg.text}</Message>}

                    <Button type="submit" disabled={loading} style={{width: '100%'}}>
                        {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
                    </Button>
                </form>
            </ResetCard>
        </Container>
    );
};

export default ResetPasswordPage;

const Container = styled.div`
    height: 100vh; display: flex; justify-content: center; align-items: center;
    background-color: ${({theme}) => theme.bgtotal};
`;
const ResetCard = styled(Card)` width: 100%; max-width: 400px; padding: 40px; 
    .header { text-align: center; margin-bottom: 20px; }
`;
const Message = styled.div`
  background-color: ${({ theme, $type }) => $type === 'error' ? theme.colorError + '20' : theme.colorSuccess + '20'};
  color: ${({ theme, $type }) => $type === 'error' ? theme.colorError : theme.colorSuccess};
  padding: 10px; border-radius: 6px; margin-bottom: 15px; text-align: center; font-size: 0.9rem; font-weight: 600;
`;
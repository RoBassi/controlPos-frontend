import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Button, Input, Card } from '../components/ui';

const SetupPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPass: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (form.password !== form.confirmPass) {
            return setError("Las contraseñas no coinciden");
        }

        setLoading(true);
        try {
            // Llamamos al endpoint especial de setup
            await api.post('/auth/setup', {
                username: form.username,
                email: form.email,
                password: form.password
            });
            
            alert("¡Administrador creado! Ahora inicia sesión.");
            navigate('/login'); // Redirigir al login
            window.location.reload(); // Recargar para que app detecte que ya está inicializado
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear administrador");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <SetupCard>
                <h1>Bienvenido a ControlPOS</h1>
                <p className="subtitle">Comencemos creando tu cuenta de Administrador</p>

                <form onSubmit={handleSubmit}>
                    <Input label="Usuario" name="username" value={form.username} onChange={handleChange} required />
                    <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    <Input label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} required />
                    <Input label="Confirmar Contraseña" name="confirmPass" type="password" value={form.confirmPass} onChange={handleChange} required />

                    {error && <ErrorMsg>{error}</ErrorMsg>}

                    <Button type="submit" disabled={loading} style={{width: '100%', marginTop: '10px'}}>
                        {loading ? 'Configurando...' : 'Crear Administrador'}
                    </Button>
                </form>
            </SetupCard>
        </Container>
    );
};

export default SetupPage;

// --- Estilos ---
const Container = styled.div`
    height: 100vh; display: flex; justify-content: center; align-items: center;
    background-color: ${({theme}) => theme.bgtotal};
`;
const SetupCard = styled(Card)`
    width: 100%; max-width: 450px; text-align: center;
    .icon-header { 
        margin: 0 auto 20px; width: 80px; height: 80px; 
        background: ${({theme})=>theme.primary}20; color: ${({theme})=>theme.primary};
        border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    h1 { font-size: 1.5rem; margin-bottom: 5px; }
    .subtitle { color: ${({theme})=>theme.colorSubtitle}; margin-bottom: 30px; font-size: 0.95rem; }
    form { text-align: left; }
`;
const ErrorMsg = styled.p` color: ${({theme})=>theme.colorError}; font-size: 0.9rem; text-align: center; margin-bottom: 10px; `;
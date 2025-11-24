import React from 'react';
import { jwtDecode } from 'jwt-decode';
import CreateUser from './CreateUser';
import { useNavigate } from 'react-router-dom';
//import { Dashboard } from '..';


const Dashboard = () => {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <div>
            <h2>Hola!</h2>
            <p>Bienvenido, tienes el rol de: <strong>{user.role}</strong></p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
            <hr />
            {user.role === 'administrador' && <CreateUser />}
        </div>
    );
};

export default Dashboard;
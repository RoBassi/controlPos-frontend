import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('editor');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/users/create',
                { username, password, role },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setMessage(`Usuario ${response.data.username} creado con éxito.`);
            setUsername('');
            setPassword('');
        } catch (err) {
            setMessage('Error al crear el usuario.');
        }
    };

    return (
        <div>
            <h3>Crear Nuevo Usuario</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Rol</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="editor">Editor</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default CreateUser;
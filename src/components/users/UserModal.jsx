import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { useUserStore } from '../../store/userStore';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    role: 'cajero'
};

export const UserModal = ({ isOpen, onClose, userToEdit }) => {
    const { createUser, updateUser } = useUserStore();
    const [form, setForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userToEdit) {
            // AL EDITAR: Cargamos los datos del usuario, pero reseteamos el pass a vacío
            // para escribir solo en caso de querer cambiarlo
            setForm({
                ...userToEdit,
                password: ''
            });
        } else {
            // AL CREAR: Formulario en blanco
            setForm(INITIAL_STATE);
        }
    }, [userToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Usamos callback (prev) para asegurar que no se pierdan datos al escribir rapido
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let success = false;
        if (userToEdit) {
            success = await updateUser(userToEdit.id_user, form);
        } else {
            success = await createUser(form);
        }

        setLoading(false);
        if (success) {
            onClose();
        }
    };

    return (
        <Overlay>
            <ModalContainer>
                <div className="header">
                    <h3>{userToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                    <button className="close-btn" type="button" onClick={onClose}>
                        <Icon icon="lucide:x" width="24" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <label>Nombre de usuario</label>
                        <div className="input-wrapper">
                            <Icon icon="lucide:user" className="input-icon" />
                            <input
                                name="username"
                                value={form.username || ''}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                autoFocus={!userToEdit}
                            />
                        </div>
                    </InputGroup>

                    <InputGroup>
                        <label>Correo Electrónico</label>
                        <div className="input-wrapper">
                            <Icon icon="lucide:mail" className="input-icon" />
                            <input
                                name="email"
                                type="email"
                                value={form.email || ''}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>
                    </InputGroup>

                    <InputGroup>
                        <label>
                            {userToEdit ? 'Nueva Contraseña (Opcional)' : 'Contraseña'}
                        </label>
                        <div className="input-wrapper">
                            <Icon icon="lucide:lock" className="input-icon" />
                            <input
                                name="password"
                                type="password"
                                // Aseguramos que nunca sea undefined
                                value={form.password || ''}
                                onChange={handleChange}
                                // Solo es required cuando creamos un user nuevo
                                required={!userToEdit}
                                placeholder={userToEdit ? "Dejar en blanco para mantener" : "Mínimo 6 caracteres"}
                                autoComplete="new-password"
                            />
                        </div>
                    </InputGroup>

                    <InputGroup>
                        <label>Rol de Acceso</label>
                        <div className="input-wrapper">
                            <Icon icon="lucide:shield" className="input-icon" />
                            <select name="role" value={form.role || 'cajero'} onChange={handleChange}>
                                <option value="cajero">Cajero (Ventas)</option>
                                <option value="administrador">Administrador (Acceso Total)</option>
                            </select>
                        </div>
                    </InputGroup>

                    <Actions>
                        <Button type="button" className="secondary" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Usuario'}
                        </Button>
                    </Actions>
                </form>
            </ModalContainer>
        </Overlay>
    );
};


const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.bgcards};
  padding: 2rem; border-radius: 15px; width: 90%; max-width: 450px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  color: ${({ theme }) => theme.text};

  .header { 
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;
      h3 { margin: 0; font-size: 1.4rem; font-weight: 700; }
      .close-btn { 
          background: none; border: none; color: inherit; cursor: pointer; 
          padding: 5px; display: flex; align-items: center;
          &:hover { opacity: 0.7; }
      }
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  label { 
      display: block; margin-bottom: 8px; font-weight: 600; 
      font-size: 0.9rem; color: ${({ theme }) => theme.colorSubtitle}; 
  }
  
  .input-wrapper { position: relative; display: flex; align-items: center; }
  
  /* CLAVE: pointer-events: none permite hacer clic "a través" del icono hacia el input */
  .input-icon { 
      position: absolute; left: 12px; 
      color: ${({ theme }) => theme.colorSubtitle}; 
      pointer-events: none; 
      z-index: 1;
  }
  
  input, select {
      width: 100%; padding: 12px 12px 12px 40px; 
      border-radius: 10px; border: 2px solid ${({ theme }) => theme.bg2};
      background: ${({ theme }) => theme.bg}; color: ${({ theme }) => theme.text};
      font-size: 1rem; outline: none; transition: 0.2s;
      
      &:focus { 
          border-color: ${({ theme }) => theme.primary}; 
          box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
      }
  }
`;

const Actions = styled.div`
   margin-top: 30px; display: flex; justify-content: flex-end; gap: 12px;
`;

const Button = styled.button`
  padding: 12px 24px; border-radius: 10px; font-weight: bold; cursor: pointer; border: none;
  background: ${({ theme }) => theme.primary}; color: white; transition: 0.2s;
  
  &:hover { filter: brightness(1.1); transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  
  &.secondary { 
      background: transparent; 
      border: 2px solid ${({ theme }) => theme.bg2}; 
      color: ${({ theme }) => theme.text}; 
      &:hover { background: ${({ theme }) => theme.bg2}; }
  }
  
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;
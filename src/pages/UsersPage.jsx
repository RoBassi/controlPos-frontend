import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { useUserStore } from '../store/userStore';
import { UserModal } from '../components/users/UserModal'; 
import { Button, Input, Card } from '../components/ui';

const UsersPage = () => {
    const { users, fetchUsers, deleteUser } = useUserStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNew = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleDelete = async (id, username) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario ${username}?`)) {
            await deleteUser(id);
        }
    };

    return (
        <Container>
            <Header>
                <h1>Gestión de Usuarios</h1>
                <div className="actions">
                    <div style={{ width: '300px' }}>
                        <Input 
                            icon="lucide:search"
                            placeholder="Buscar usuario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ marginBottom: 0 }} 
                        />
                    </div>
                    <Button onClick={handleNew}>
                        <Icon icon="lucide:plus" width="20"/> Nuevo Usuario
                    </Button>
                </div>
            </Header>

            <TableCard>
                <Table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th className="center">Estado</th>
                            <th className="right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id_user}>
                                    <td className="fw-bold">
                                        <div className="user-cell">
                                            <Icon icon="lucide:user" className="icon"/>
                                            {user.username}
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <RoleBadge $role={user.role}>{user.role}</RoleBadge>
                                    </td>
                                    <td className="center">
                                        <StatusBadge>Activo</StatusBadge>
                                    </td>
                                    <td className="right">
                                        <div className="actions-cell">
                                            <IconButton onClick={() => handleEdit(user)}>
                                                <Icon icon="lucide:edit-3" />
                                            </IconButton>
                                            <IconButton $danger onClick={() => handleDelete(user.id_user, user.username)}>
                                                <Icon icon="lucide:trash-2" />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="empty-msg">No se encontraron usuarios</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </TableCard>

            <UserModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)}
                userToEdit={editingUser}
            />
        </Container>
    );
};

export default UsersPage;

const Container = styled.div`
  padding: 20px;
  display: flex; flex-direction: column; gap: 20px;
`;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;
  h1 { font-size: 1.5rem; color: ${({ theme }) => theme.text}; margin: 0; font-weight: 700; }
  .actions { display: flex; gap: 10px; align-items: center; }
`;

const TableCard = styled(Card)`
  padding: 0; 
  overflow: hidden; 
`;

const Table = styled.table`
  width: 100%; border-collapse: collapse; min-width: 600px;
  
  th {
      text-align: left; padding: 16px; 
      background: ${({ theme }) => theme.bgtotal}; 
      color: ${({ theme }) => theme.colorSubtitle}; 
      font-size: 0.85rem; text-transform: uppercase; font-weight: 700;
      border-bottom: 1px solid ${({ theme }) => theme.bg2};
  }
  
  td {
      padding: 14px 16px; 
      border-bottom: 1px solid ${({ theme }) => theme.bg2};
      color: ${({ theme }) => theme.text}; font-size: 0.95rem;
      
      &.fw-bold { font-weight: 600; }
      &.empty-msg { text-align: center; padding: 40px; color: ${({ theme }) => theme.colorSubtitle}; }
      
      .user-cell { display: flex; align-items: center; gap: 10px; .icon { color: ${({theme})=>theme.colorSubtitle}; } }
  }

  .center { text-align: center; }
  .right { text-align: right; }
  
  tbody tr:hover {
      background-color: ${({ theme }) => theme.bgtotal};
  }
`;

const RoleBadge = styled.span`
  background: ${({ theme, $role }) => $role === 'administrador' ? theme.colorWarning + '20' : theme.primary + '20'};
  color: ${({ theme, $role }) => $role === 'administrador' ? '#F57F17' : theme.primary}; /* Ajuste contraste naranja */
  padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; text-transform: capitalize;
`;

const StatusBadge = styled.span`
  background: ${({ theme }) => theme.colorSuccess + '20'};
  color: ${({ theme }) => theme.colorSuccess};
  padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;
`;

const IconButton = styled.button`
    border: none; background: transparent; cursor: pointer; padding: 6px; border-radius: 4px;
    color: ${({ theme, $danger }) => $danger ? theme.colorError : theme.primary};
    transition: background 0.2s;
    &:hover { background: ${({ theme, $danger }) => $danger ? theme.colorError + '20' : theme.primary + '20'}; }
`;
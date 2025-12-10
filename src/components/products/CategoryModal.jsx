import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { useProductStore } from '../../store/productStore';
import { Button, Input, Card } from '../ui';

export const CategoryModal = ({ isOpen, onClose }) => {
  const { createCategory } = useProductStore();
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    setLoading(true);
    const success = await createCategory(nombre);
    setLoading(false);

    if (success) {
        setNombre('');
        onClose();
    }
  };

  return (
    <Overlay>
      <ModalCard>
        <div className="header">
          <h3>Nueva Categoría</h3>
          <button className="close-btn" onClick={onClose}><Icon icon="lucide:x" width="24"/></button>
        </div>
        
        <form onSubmit={handleSubmit}>
           <Input 
              label="Nombre de la Categoría"
              autoFocus
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
           />
           
           <Actions>
             <Button type="button" $variant="outline" onClick={onClose}>Cancelar</Button>
             <Button type="submit" disabled={loading}>
                {loading ? 'Creando...' : 'Guardar Categoría'}
             </Button>
           </Actions>
        </form>
      </ModalCard>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(2px);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
`;

const ModalCard = styled(Card)`
  width: 400px;
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; 
    h3 { margin: 0; font-size: 1.2rem; }
    .close-btn { background: none; border: none; color: inherit; cursor: pointer; }
  }
`;

const Actions = styled.div`
  display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
`;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { useProductStore } from '../../store/productStore';
import { Device } from '../../styles/breakpoints';
import { Button, Input, Card } from '../ui';

const INITIAL_STATE = {
    codigo_barras: '', 
    nombre: '', 
    descripcion: '', 
    precio_costo: '', 
    precio_venta: '', 
    stock: '', 
    stock_minimo: '', 
    categoria_id: ''
};

export const ProductModal = ({ isOpen, onClose, productToEdit }) => {
  const { categories, saveProduct } = useProductStore();
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setForm({
          ...productToEdit,
          descripcion: productToEdit.descripcion || '',
          codigo_barras: productToEdit.codigo_barras || ''
      });
    } else {
      setForm(INITIAL_STATE);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
        ...form,
        precio_costo: form.precio_costo === '' ? 0 : parseFloat(form.precio_costo),
        precio_venta: form.precio_venta === '' ? 0 : parseFloat(form.precio_venta),
        stock: form.stock === '' ? 0 : parseInt(form.stock),
        stock_minimo: form.stock_minimo === '' ? 0 : parseInt(form.stock_minimo),
        categoria_id: form.categoria_id ? parseInt(form.categoria_id) : null
    };

    const success = await saveProduct(payload);
    setLoading(false);
    if (success) onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <div className="header">
          <h3>{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</h3>
          <button className="close-btn" onClick={onClose}><Icon icon="lucide:x" width="24" /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
           <div className="grid-form">
             <div className="col-span-1">
                <Input 
                    label="Código de Barras"
                    name="codigo_barras"
                    value={form.codigo_barras}
                    onChange={handleChange}
                    autoFocus={!productToEdit}
                    placeholder="Escanear o escribir..."
                />
             </div>

             <div className="col-span-1">
                <Label>Categoría</Label>
                <FlatSelect name="categoria_id" value={form.categoria_id} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    {categories.map(cat => (
                        <option key={cat.id_categoria} value={cat.id_categoria}>
                            {cat.nombre}
                        </option>
                    ))}
                </FlatSelect>
             </div>

             <div className="full-width">
                <Input 
                    label="Nombre del Producto"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
             </div>

             <div className="full-width">
                <Label>Descripción (Opcional)</Label>
                <FlatTextarea 
                    name="descripcion" 
                    value={form.descripcion} 
                    onChange={handleChange}
                    rows="3"
                />
             </div>

             <Input 
                label="$ Costo"
                type="number" step="0.01"
                name="precio_costo"
                value={form.precio_costo}
                onChange={handleChange}
             />
             <Input 
                label="$ Venta"
                type="number" step="0.01"
                name="precio_venta"
                value={form.precio_venta}
                onChange={handleChange}
                required
             />

             <Input 
                label="Stock Actual"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
             />
             <Input 
                label="Stock Mínimo"
                type="number"
                name="stock_minimo"
                value={form.stock_minimo}
                onChange={handleChange}
             />
           </div>
           
           <Actions>
               <Button type="button" $variant="outline" onClick={onClose}>Cancelar</Button>
               <Button type="submit" disabled={loading}>
                   {loading ? 'Guardando...' : 'Guardar Producto'}
               </Button>
           </Actions>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(2px);
  display: flex; justify-content: center; align-items: center; z-index: 999;
`;

const ModalContainer = styled(Card)`
  width: 90%; max-width: 650px;
  max-height: 90vh; overflow-y: auto;

  .header { 
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
      h3 { margin: 0; font-size: 1.25rem; }
      .close-btn { background: none; border: none; color: inherit; cursor: pointer; }
  }

  .grid-form {
      display: grid; grid-template-columns: 1fr; gap: 15px;
      @media ${Device.tablet} { grid-template-columns: 1fr 1fr; }
  }

  .full-width { grid-column: 1 / -1; }
`;

const Actions = styled.div`
  margin-top: 25px; display: flex; justify-content: flex-end; gap: 10px;
`;

// Estilos manuales planos para Select y Textarea (imitando al Input)
const Label = styled.label`
  display: block; font-size: 0.9rem; font-weight: 600; color: ${({ theme }) => theme.colorSubtitle}; margin-bottom: 6px;
`;

const commonInputStyles = `
  width: 100%; padding: 10px 12px; border-radius: 6px;
  font-family: inherit; font-size: 1rem; outline: none;
  transition: border-color 0.2s;
`;

const FlatSelect = styled.select`
  ${commonInputStyles}
  border: 1px solid ${({theme}) => theme.bg2};
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
  &:focus { border-color: ${({theme}) => theme.primary}; }
  margin-bottom: 15px;
`;

const FlatTextarea = styled.textarea`
  ${commonInputStyles}
  border: 1px solid ${({theme}) => theme.bg2};
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
  resize: vertical;
  &:focus { border-color: ${({theme}) => theme.primary}; }
  margin-bottom: 15px;
`;
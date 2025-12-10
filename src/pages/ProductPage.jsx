import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { useProductStore } from '../store/productStore';
import { ProductModal } from '../components/products/ProductModal';
import { CategoryModal } from '../components/products/CategoryModal';
import { Button, Input, Card } from '../components/ui';

const ProductPage = () => {
    const { products, categories, fetchData, deleteProduct } = useProductStore();
    
    // Estados
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isCatModalOpen, setCatModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const filteredProducts = products.filter(p => {
        const searchLower = searchTerm.toLowerCase();
        const matchText = p.nombre.toLowerCase().includes(searchLower) || (p.codigo_barras && p.codigo_barras.includes(searchLower));
        const matchCategory = categoryFilter ? p.categoria_id === parseInt(categoryFilter) : true;
        return matchText && matchCategory;
    });

    const handleEdit = (prod) => { setEditingProduct(prod); setModalOpen(true); };
    const handleNew = () => { setEditingProduct(null); setModalOpen(true); };
    const handleDelete = async (id) => { if (window.confirm("¿Eliminar producto?")) await deleteProduct(id); };

    return (
        <Container>
            <Header>
                <h1>Inventario</h1>
                <div className="actions-header">
                    <Button $variant="secondary" onClick={() => setCatModalOpen(true)}>
                        <Icon icon="lucide:layers" /> Categorías
                    </Button>
                    <Button onClick={handleNew}>
                        <Icon icon="lucide:plus" /> Nuevo Producto
                    </Button>
                </div>
            </Header>

            <Controls>
                <div style={{ flex: 1, maxWidth: '400px' }}>
                    <Input 
                        icon="lucide:search"
                        placeholder="Buscar por código o nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: 0 }}
                    />
                </div>
                
                <FlatSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">Todas las Categorías</option>
                    {categories.map(cat => (
                        <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                    ))}
                </FlatSelect>
            </Controls>

            <TableCard>
                <Table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th className="center">Stock</th>
                            <th>Precio</th>
                            <th className="right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(prod => {
                                const catName = categories.find(c => c.id_categoria === prod.categoria_id)?.nombre || '-';
                                const isLow = prod.stock <= (prod.stock_minimo || 5);

                                return (
                                    <tr key={prod.id_product}>
                                        <td className="code">{prod.codigo_barras || '-'}</td>
                                        <td className="fw-bold">{prod.nombre}</td>
                                        <td><Badge>{catName}</Badge></td>
                                        <td className="center">
                                            <StockBadge $low={isLow}>{prod.stock}</StockBadge>
                                        </td>
                                        <td>${prod.precio_venta}</td>
                                        <td className="right">
                                            <div className="actions-cell">
                                                <IconButton onClick={() => handleEdit(prod)}>
                                                    <Icon icon="lucide:edit-3" />
                                                </IconButton>
                                                <IconButton $danger onClick={() => handleDelete(prod.id_product)}>
                                                    <Icon icon="lucide:trash-2" />
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr><td colSpan="6" className="empty-msg">No se encontraron productos</td></tr>
                        )}
                    </tbody>
                </Table>
            </TableCard>

            <ProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} productToEdit={editingProduct} />
            <CategoryModal isOpen={isCatModalOpen} onClose={() => setCatModalOpen(false)} />
        </Container>
    );
};

export default ProductPage;

const Container = styled.div` padding: 20px; display: flex; flex-direction: column; gap: 20px; `;
const Header = styled.div` display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; h1 { font-size: 1.5rem; margin: 0; } .actions-header { display: flex; gap: 10px; }`;
const Controls = styled.div` display: flex; gap: 15px; flex-wrap: wrap; `;

const FlatSelect = styled.select`
    padding: 10px 15px; border-radius: 6px; 
    border: 1px solid ${({ theme }) => theme.bg2};
    background: ${({ theme }) => theme.bgcards}; 
    color: ${({ theme }) => theme.text};
    outline: none; font-size: 0.95rem; cursor: pointer;
    &:focus { border-color: ${({ theme }) => theme.primary}; }
`;

const TableCard = styled(Card)` padding: 0; overflow: hidden; `;

const Table = styled.table`
  width: 100%; border-collapse: collapse; min-width: 600px;
  th { text-align: left; padding: 16px; background: ${({ theme }) => theme.bgtotal}; color: ${({ theme }) => theme.colorSubtitle}; font-size: 0.85rem; font-weight: 700; border-bottom: 1px solid ${({ theme }) => theme.bg2}; text-transform: uppercase; }
  td { padding: 14px 16px; border-bottom: 1px solid ${({ theme }) => theme.bg2}; color: ${({ theme }) => theme.text}; font-size: 0.95rem; &.code { font-family: monospace; color: ${({theme})=>theme.colorSubtitle}; } &.fw-bold { font-weight: 600; } &.empty-msg { text-align: center; padding: 40px; color: ${({ theme }) => theme.colorSubtitle}; } }
  .center { text-align: center; } .right { text-align: right; } .actions-cell { display: flex; justify-content: flex-end; gap: 5px; }
  tbody tr:hover { background-color: ${({ theme }) => theme.bgtotal}; }
`;

const Badge = styled.span` background: ${({ theme }) => theme.bgtotal}; color: ${({ theme }) => theme.colorSubtitle}; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; border: 1px solid ${({theme})=>theme.bg2};`;

const StockBadge = styled.span`
    color: ${({ theme, $low }) => $low ? theme.colorError : theme.colorSuccess};
    font-weight: 700;
`;

const IconButton = styled.button`
    border: none; background: transparent; cursor: pointer; padding: 6px; border-radius: 4px;
    color: ${({ theme, $danger }) => $danger ? theme.colorError : theme.primary};
    &:hover { background: ${({ theme, $danger }) => $danger ? theme.colorError + '20' : theme.primary + '20'}; }
`;
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { PaymentModal } from '../components/pos/PaymentModal';
import { Button, Input, Card } from '../components/ui';

const PosPage = () => {
    const { products, fetchData } = useProductStore();
    const { cart, addToCart, removeFromCart, updateQuantity, total, clearCart, processSale } = useCartStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [showPayModal, setShowPayModal] = useState(false);
    const searchInputRef = useRef(null);

    const formatCurrency = (val) => val.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fontSizeDinamico = formatCurrency(total).length > 10 ? "2rem" : "3rem";

    useEffect(() => {
        fetchData();
        setTimeout(() => searchInputRef.current?.focus(), 100);
    }, []);

    const handleContainerClick = (e) => {
        if (!['BUTTON', 'INPUT', 'SELECT'].includes(e.target.tagName)) searchInputRef.current?.focus();
    };

    const handleScan = (e) => {
        if (e.key === 'Enter') {
            const term = searchTerm.trim().toLowerCase();
            if (!term) return;
            const exact = products.find(p => p.codigo_barras === term);
            const loose = products.find(p => p.nombre.toLowerCase().includes(term));
            const match = exact || loose;

            if (match) {
                addToCart(match);
                setSearchTerm("");
            } else {
                alert("Producto no encontrado");
                setSearchTerm("");
            }
        }
    };

    const handleFinalizeSale = async (methodId) => {
        const result = await processSale(methodId);
        if (result.success) {
            setShowPayModal(false);
            alert("¡Venta Exitosa!");
            setTimeout(() => searchInputRef.current?.focus(), 100);
        } else {
            alert("Error: " + result.msg);
        }
    };

    return (
        <Layout onClick={handleContainerClick}>
            <MainSection>
                <div style={{ marginBottom: '20px' }}>
                    <ScannerInput
                        ref={searchInputRef}
                        icon="lucide:scan-barcode"
                        placeholder="Escanear código de barras o buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleScan}
                        autoComplete="off"
                    />
                </div>

                <ItemsCard>
                    <div className="list-header">
                        <span>Producto</span>
                        <span className="center">Cant.</span>
                        <span className="right">Total</span>
                        <span className="action"></span>
                    </div>
                    <div className="list-content">
                        {cart.length === 0 ? (
                            <EmptyState>
                                <Icon icon="lucide:shopping-cart" width="48" style={{ opacity: 0.2 }} />
                                <p>Carrito vacío</p>
                            </EmptyState>
                        ) : (
                            cart.map((item) => (
                                <ListItem key={item.id_product}>
                                    <div className="prod-info">
                                        <span className="name">{item.nombre}</span>
                                        <span className="code">{item.codigo_barras || 'S/C'}</span>
                                    </div>

                                    <div className="qty-control">
                                        <IconButton onClick={() => updateQuantity(item.id_product, item.cantidad - 1)}>
                                            <Icon icon="lucide:minus" />
                                        </IconButton>

                                        <span className="qty-value">{item.cantidad}</span>

                                        <IconButton onClick={() => updateQuantity(item.id_product, item.cantidad + 1)}>
                                            <Icon icon="lucide:plus" />
                                        </IconButton>
                                    </div>

                                    <div className="total-price">${formatCurrency(item.precio_venta * item.cantidad)}</div>

                                    <IconButton $danger onClick={() => removeFromCart(item.id_product)}>
                                        <Icon icon="lucide:trash-2" />
                                    </IconButton>
                                </ListItem>
                            ))
                        )}
                    </div>
                </ItemsCard>
            </MainSection>

            <Sidebar>
                <TotalCard>
                    <h3>TOTAL A PAGAR</h3>
                    <div className="amount" style={{ fontSize: fontSizeDinamico }}>
                        ${formatCurrency(total)}
                    </div>
                    <div className="details">
                        <span>{cart.reduce((acc, item) => acc + item.cantidad, 0)} artículos</span>
                    </div>
                </TotalCard>

                <Actions>
                    <PayButton
                        onClick={() => setShowPayModal(true)}
                        disabled={cart.length === 0}
                    >
                        <div className="content">
                            <Icon icon="lucide:circle-dollar-sign" width="32" />
                            <span>COBRAR</span>
                        </div>
                    </PayButton>

                    <Button
                        $variant="outline"
                        onClick={clearCart}
                        disabled={cart.length === 0}
                        style={{ height: '50px' }}
                    >
                        <Icon icon="lucide:x" width="20" /> Cancelar Venta
                    </Button>
                </Actions>
            </Sidebar>

            <PaymentModal
                isOpen={showPayModal}
                onClose={() => setShowPayModal(false)}
                total={total}
                onConfirm={handleFinalizeSale}
            />
        </Layout>
    );
};

export default PosPage;

const Layout = styled.div`
    display: flex; height: 100%; gap: 20px; padding: 20px;
    background-color: ${({ theme }) => theme.bgtotal};
`;

const MainSection = styled.div`
    flex: 1; display: flex; flex-direction: column; overflow: hidden;
`;

const ScannerInput = styled(Input)`
    input { 
        padding: 15px; padding-left: 45px; font-size: 1.1rem; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    .input-icon { top: 15px; font-size: 1.4rem; }
`;

const ItemsCard = styled(Card)`
    flex: 1; padding: 0; display: flex; flex-direction: column; overflow: hidden;
    
    .list-header {
        display: grid; grid-template-columns: 2fr 1fr 1fr 50px;
        padding: 15px 20px; background: ${({ theme }) => theme.bgtotal};
        font-weight: 700; color: ${({ theme }) => theme.colorSubtitle}; font-size: 0.85rem;
        border-bottom: 1px solid ${({ theme }) => theme.bg2};
        .center { text-align: center; } .right { text-align: right; }
    }
    .list-content { flex: 1; overflow-y: auto; }
`;

const ListItem = styled.div`
    display: grid; grid-template-columns: 2fr 1fr 1fr 50px; align-items: center;
    padding: 12px 20px; border-bottom: 1px solid ${({ theme }) => theme.bg2};
    transition: background-color 0.1s;
    
    &:hover { background-color: ${({ theme }) => theme.bgtotal}; }

    .prod-info { display: flex; flex-direction: column; .name{font-weight:600;} .code{font-size:0.8rem; color:gray;} }
    
    .qty-control { 
        display: flex; justify-content: center; align-items: center; gap: 8px; 
        .qty-value { font-weight: 700; font-size: 1rem; min-width: 25px; text-align: center; }
    }
    
    .total-price { text-align: right; font-weight: 700; font-size: 1.1rem; color: ${({ theme }) => theme.text}; }
`;

const IconButton = styled.button`
    border: none; background: transparent; cursor: pointer; 
    padding: 6px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    color: ${({ theme, $danger }) => $danger ? theme.colorError : theme.primary};
    transition: background 0.2s;
    
    &:hover { 
        background: ${({ theme, $danger }) => $danger ? theme.colorError + '20' : theme.primary + '20'}; 
    }
`;

const EmptyState = styled.div`
    height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;
    color: ${({ theme }) => theme.colorSubtitle}; gap: 10px;
`;

const Sidebar = styled.div` width: 320px; display: flex; flex-direction: column; gap: 20px; `;

const TotalCard = styled(Card)`
    background: ${({ theme }) => theme.text};
    color: #1E88E5; text-align: center;
    h3 { margin: 0; font-size: 0.9rem; opacity: 0.8; letter-spacing: 1px; }
    .amount { font-weight: 800; margin: 10px 0; white-space: nowrap; }
    .details { border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; font-size: 0.9rem; opacity: 0.8; }
`;

const Actions = styled.div` flex: 1; display: flex; flex-direction: column; gap: 10px; justify-content: flex-end; `;

const PayButton = styled(Button)`
    height: 80px; font-size: 1.5rem; 
    padding: 0 20px;
    background-color: ${({ theme }) => theme.colorSuccess};
    
    /* 1. Cambiamos space-between por center */
    justify-content: center;
    
    /* 2. Agregamos posición relativa al botón padre */
    position: relative; 
    
    .content { display: flex; align-items: center; gap: 10px; }
    
    .shortcut { 
        font-size: 0.8rem; 
        background: rgba(255,255,255,0.2); 
        padding: 4px 8px; 
        border-radius: 4px; 
        
        /* 3. Posicionamos el shortcut de forma absoluta a la derecha */
        position: absolute;
        right: 20px;
        /* (Opcional) Centrado vertical exacto del shortcut */
        top: 50%;
        transform: translateY(-50%);
    }
    
    &:hover { background-color: #388E3C; }
`;


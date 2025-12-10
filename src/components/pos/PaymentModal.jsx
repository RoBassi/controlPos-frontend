import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { Button, Input, Card } from '../ui';

export const PaymentModal = ({ isOpen, onClose, total, onConfirm }) => {
    const [method, setMethod] = useState('1');
    const [amountTendered, setAmountTendered] = useState('');
    const [change, setChange] = useState(0);

    const format = (val) => val.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    useEffect(() => {
        if (isOpen) {
            setMethod('1');
            setAmountTendered('');
            setChange(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const val = amountTendered === '' ? total : parseFloat(amountTendered);
        const payAmount = isNaN(val) ? 0 : val;
        if (method === '1') setChange(payAmount - total);
        else setChange(0);
    }, [amountTendered, total, method]);

    const handleConfirm = (e) => {
        e.preventDefault();
        const finalPayment = amountTendered === '' ? total : parseFloat(amountTendered);
        if (finalPayment < total - 0.01) return alert("Monto insuficiente.");
        onConfirm(parseInt(method));
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <div className="header">
                    <h3>Finalizar Venta</h3>
                    <button type="button" className="close-btn" onClick={onClose}>
                        <Icon icon="lucide:x" width="24" />
                    </button>
                </div>

                <TotalDisplay>
                    <small>Total a Pagar</small>
                    <div className="amount">${format(total)}</div>
                </TotalDisplay>

                <form onSubmit={handleConfirm}>
                    <div style={{ marginBottom: '15px' }}>
                        <Label>Método de Pago</Label>
                        <FlatSelect value={method} onChange={(e) => { setMethod(e.target.value); setAmountTendered(''); }}>
                            <option value="1">Efectivo</option>
                            <option value="2">Tarjeta Crédito</option>
                            <option value="3">Tarjeta Débito</option>
                            <option value="4">Transferencia</option>
                        </FlatSelect>
                    </div>

                    <Input
                        label="Paga con:"
                        type="number" step="0.01"
                        value={amountTendered}
                        onChange={(e) => setAmountTendered(e.target.value)}
                        placeholder={`Monto exacto ($${format(total)})`}
                        autoFocus
                    />

                    {method === '1' && (
                        <ChangeDisplay $isNegative={change < -0.01}>
                            <span>Vuelto:</span>
                            <strong>${format(change)}</strong>
                        </ChangeDisplay>
                    )}

                    <Actions>
                        <Button type="button" $variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" $variant="success" style={{ flex: 1 }}>Confirmar</Button>
                    </Actions>
                </form>
            </ModalContainer>
        </Overlay>
    );
};

const Overlay = styled.div`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
    display: flex; justify-content: center; align-items: center; z-index: 2000;
`;

const ModalContainer = styled(Card)`
    width: 400px;
    .header { 
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
        h3 { margin: 0; font-size: 1.4rem; }
        .close-btn { background: none; border: none; cursor: pointer; color: inherit; }
    }
`;

const TotalDisplay = styled.div`
    background: ${({ theme }) => theme.bgtotal}; 
    padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.bg2};
    small { text-transform: uppercase; font-weight: 700; color: ${({ theme }) => theme.colorSubtitle}; font-size: 0.8rem; }
    .amount { font-size: 2.5rem; font-weight: 800; color: ${({ theme }) => theme.primary}; margin-top: 5px; }
`;

const Label = styled.label`
  display: block; font-size: 0.9rem; font-weight: 600; color: ${({ theme }) => theme.colorSubtitle}; margin-bottom: 6px;
`;

const FlatSelect = styled.select`
    width: 100%; padding: 10px; border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.bg2};
    background: ${({ theme }) => theme.bg}; color: ${({ theme }) => theme.text};
    outline: none; font-size: 1rem; cursor: pointer;
    &:focus { border-color: ${({ theme }) => theme.primary}; }
`;

const ChangeDisplay = styled.div`
    display: flex; justify-content: space-between; align-items: center;
    padding: 15px; margin-bottom: 20px; border-radius: 8px;
    background: ${({ $isNegative, theme }) => $isNegative ? theme.colorError + '15' : theme.colorSuccess + '15'};
    color: ${({ $isNegative, theme }) => $isNegative ? theme.colorError : theme.colorSuccess};
    font-size: 1.2rem; font-weight: 600;
`;

const Actions = styled.div` display: flex; gap: 10px; margin-top: 10px; `;
import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";
import { useReportStore } from '../store/reportStore';
import { Device } from '../styles/breakpoints';
import { Button, Card } from '../components/ui';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
registerLocale('es', es);

const ReportsPage = () => {
    const { fetchReports, sales, stats, fetchSaleDetails, saleDetails, clearDetails, loading } = useReportStore();
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filterType, setFilterType] = useState('today');
    const [selectedSale, setSelectedSale] = useState(null);

    useEffect(() => {
        handleSearch();
    }, []);

    const formatDateForAPI = (date) => date ? date.toLocaleDateString('en-CA') : '';

    const handleSearch = () => {
        if (!startDate || !endDate) return;
        fetchReports(formatDateForAPI(startDate), formatDateForAPI(endDate));
    };

    // Calcular totales por usuario localmente
    const salesByUser = useMemo(() => {
        const grouped = {};
        sales.forEach(sale => {
            const name = sale.vendedor;
            if (!grouped[name]) grouped[name] = 0;
            grouped[name] += parseFloat(sale.total);
        });

        return Object.keys(grouped)
            .map(key => ({ name: key, total: grouped[key] }))
            .sort((a, b) => b.total - a.total);
    }, [sales]);

    const applyQuickFilter = (type) => {
        setFilterType(type);
        const now = new Date();
        let start = new Date(), end = new Date();

        if (type === 'today') { start = now; end = now; }
        else if (type === 'month') {
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        } else if (type === 'lastMonth') {
            start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            end = new Date(now.getFullYear(), now.getMonth(), 0);
        }

        setStartDate(start); setEndDate(end);
        fetchReports(formatDateForAPI(start), formatDateForAPI(end));
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start); setEndDate(end);
        setFilterType('custom');
    };

    const openDetail = (sale) => { setSelectedSale(sale); fetchSaleDetails(sale.id_venta); };
    const closeDetail = () => { setSelectedSale(null); clearDetails(); };
    const formatCurrency = (val) => Number(val).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formatDate = (dateString) => new Date(dateString).toLocaleString('es-AR');

    return (
        <Container>
            <Header>
                <h1>Reportes de Venta</h1>
            </Header>

            <FiltersCard>
                <div className="quick-actions">
                    <Button $variant={filterType === 'today' ? 'primary' : 'outline'} onClick={() => applyQuickFilter('today')}>Hoy</Button>
                    <Button $variant={filterType === 'month' ? 'primary' : 'outline'} onClick={() => applyQuickFilter('month')}>Este Mes</Button>
                    <Button $variant={filterType === 'lastMonth' ? 'primary' : 'outline'} onClick={() => applyQuickFilter('lastMonth')}>Mes Pasado</Button>
                </div>

                <DateControls>
                    <div className="date-picker-wrap">
                        <Icon icon="lucide:calendar-days" className="icon-cal" />
                        <DatePicker 
                            selected={startDate} onChange={handleDateChange}
                            startDate={startDate} endDate={endDate} selectsRange 
                            locale="es" dateFormat="dd/MM/yyyy" className="custom-input" 
                            placeholderText="Rango de fechas" isClearable={false}
                        />
                    </div>
                    <Button onClick={handleSearch} style={{padding: '8px 12px'}}>
                        <Icon icon="lucide:search" />
                    </Button>
                </DateControls>
            </FiltersCard>

            <StatsGrid>
                <StatCard className="blue">
                    <div className="title">Ventas Totales</div>
                    <div className="value">${formatCurrency(stats.global.total_facturado || 0)}</div>
                    <div className="sub">{stats.global.cantidad_ventas} transacciones</div>
                </StatCard>
                <StatCard className="green">
                    <div className="title">Ganancia Estimada</div>
                    <div className="value">${formatCurrency(stats.global.ganancia_estimada || 0)}</div>
                    <div className="sub">Rentabilidad</div>
                </StatCard>
            </StatsGrid>

            <ContentGrid>
                <SectionCard>
                    <h3>Por Vendedor</h3>
                    <ListContainer>
                        {salesByUser.map((user, index) => (
                            <div className="list-item" key={index}>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                    <Icon icon="lucide:user" color="#1E88E5"/>
                                    <span>{user.name}</span>
                                </div>
                                <strong>${formatCurrency(user.total)}</strong>
                            </div>
                        ))}
                        {salesByUser.length === 0 && <p className="empty-msg">Sin datos</p>}
                    </ListContainer>
                </SectionCard>

                <SectionCard>
                    <h3>Por Categoría</h3>
                    <ListContainer>
                        {stats.byCategory.map((cat, index) => (
                            <div className="list-item" key={index}>
                                <span>{cat.categoria}</span>
                                <strong>${formatCurrency(cat.total)}</strong>
                            </div>
                        ))}
                        {stats.byCategory.length === 0 && <p className="empty-msg">Sin datos</p>}
                    </ListContainer>
                </SectionCard>

                <SectionCard style={{ gridColumn: '1 / -1' }}>
                    <h3>Historial Detallado</h3>
                    <TableWrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>Fecha</th>
                                    <th>Vendedor</th>
                                    <th>Pago</th>
                                    <th className="right">Total</th>
                                    <th className="center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="center">Cargando...</td></tr>
                                ) : sales.length === 0 ? (
                                    <tr><td colSpan="6" className="empty-msg">No hay ventas en este rango.</td></tr>
                                ) : (
                                    sales.map(sale => (
                                        <tr key={sale.id_venta}>
                                            <td className="code">{sale.id_venta}</td>
                                            <td>{formatDate(sale.fecha)}</td>
                                            <td>{sale.vendedor}</td>
                                            <td><Badge>{sale.metodo_pago}</Badge></td>
                                            <td className="right fw-bold">${formatCurrency(sale.total)}</td>
                                            <td className="center">
                                                <IconButton onClick={() => openDetail(sale)}>
                                                    <Icon icon="lucide:eye" />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </TableWrapper>
                </SectionCard>
            </ContentGrid>

            {selectedSale && (
                <DetailOverlay onClick={closeDetail}>
                    <DetailCard onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Venta #{selectedSale.id_venta}</h2>
                            <button onClick={closeDetail}><Icon icon="lucide:x" /></button>
                        </div>
                        <div className="items-list">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Prod</th>
                                        <th className="center">Cant</th>
                                        <th className="right">Precio</th>
                                        <th className="right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {saleDetails.map((d, i) => (
                                        <tr key={i}>
                                            <td>{d.producto}</td>
                                            <td className="center">{d.cantidad}</td>
                                            <td className="right">${formatCurrency(d.precio_unitario)}</td>
                                            <td className="right fw-bold">${formatCurrency(d.subtotal)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="modal-total">
                            Total: ${formatCurrency(selectedSale.total)}
                        </div>
                    </DetailCard>
                </DetailOverlay>
            )}
        </Container>
    );
};

export default ReportsPage;

const Container = styled.div` padding: 20px; display: flex; flex-direction: column; gap: 20px; height: 100%; overflow-y: auto; `;
const Header = styled.div` h1 { margin: 0; font-size: 1.5rem; color: ${({theme})=>theme.text}; font-weight: 700; } `;
const FiltersCard = styled(Card)` display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between; @media ${Device.mobile} { flex-direction: column; align-items: stretch; } .quick-actions { display: flex; gap: 10px; }`;

const DateControls = styled.div` 
    display: flex; align-items: center; gap: 10px; 
    background: ${({theme}) => theme.bgtotal}; padding: 5px; 
    border-radius: 8px; border: 1px solid ${({theme})=>theme.bg2}; 
    
    .date-picker-wrap { 
        display: flex; align-items: center; 
        .icon-cal { color: ${({theme}) => theme.colorSubtitle}; margin-left: 10px; margin-right: 5px; } 
        .custom-input { background: transparent; border: none; color: ${({theme}) => theme.text}; width: 190px; text-align: center; outline: none; font-family: inherit; } 
    } 
    .react-datepicker-wrapper { width: auto; } 
    .react-datepicker { background-color: ${({theme})=>theme.bgcards}; border: 1px solid ${({theme})=>theme.bg2}; color: ${({theme})=>theme.text}; font-family: inherit; } 
    .react-datepicker__header { background-color: ${({theme})=>theme.bgtotal}; border-bottom: 1px solid ${({theme})=>theme.bg2}; } 
    .react-datepicker__current-month, .react-datepicker__day-name { color: ${({theme})=>theme.text}; } 
    .react-datepicker__day { color: ${({theme})=>theme.text}; &:hover { background-color: ${({theme})=>theme.bgtotal}; } } 
    .react-datepicker__day--selected, .react-datepicker__day--in-range { background-color: ${({theme})=>theme.primary}; color: white; }
`;

const StatsGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; `;
const StatCard = styled(Card)` border-left: 4px solid gray; &.blue { border-left-color: ${({theme})=>theme.primary}; } &.green { border-left-color: ${({theme})=>theme.colorSuccess}; } .title { color: ${({theme})=>theme.colorSubtitle}; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; } .value { font-size: 1.8rem; font-weight: 800; margin: 8px 0; color: ${({theme})=>theme.text}; } .sub { font-size: 0.8rem; color: ${({theme})=>theme.colorSubtitle}; }`;
const ContentGrid = styled.div` 
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px; 
    @media ${Device.tablet} { grid-template-columns: 1fr; } 
`;

const SectionCard = styled(Card)` padding: 0; overflow: hidden; h3 { padding: 20px; margin: 0; font-size: 1.1rem; border-bottom: 1px solid ${({theme})=>theme.bg2}; }`;
const TableWrapper = styled.div` overflow-x: auto; `;
const Table = styled.table` width: 100%; border-collapse: collapse; min-width: 500px; th { text-align: left; padding: 12px 16px; background: ${({theme}) => theme.bgtotal}; color: ${({theme}) => theme.colorSubtitle}; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; } td { padding: 12px 16px; border-bottom: 1px solid ${({theme}) => theme.bg2}; color: ${({theme}) => theme.text}; font-size: 0.9rem; &.code { font-family: monospace; color: ${({theme})=>theme.colorSubtitle}; } &.fw-bold { font-weight: 700; font-size: 1rem;} &.empty-msg { text-align: center; padding: 30px; color: ${({theme})=>theme.colorSubtitle}; } } .center { text-align: center; } .right { text-align: right; } tbody tr:hover { background-color: ${({theme}) => theme.bgtotal}; }`;
const Badge = styled.span` background: ${({theme}) => theme.bgtotal}; border: 1px solid ${({theme})=>theme.bg2}; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; color: ${({theme})=>theme.text}; `;
const IconButton = styled.button` border: none; background: transparent; cursor: pointer; padding: 6px; border-radius: 4px; color: ${({theme})=>theme.primary}; &:hover { background: ${({theme})=>theme.bgtotal}; }`;
const ListContainer = styled.div` padding: 20px; display: flex; flex-direction: column; gap: 10px; .list-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: ${({theme})=>theme.bgtotal}; border-radius: 8px; color: ${({theme})=>theme.text}; border: 1px solid ${({theme})=>theme.bg2}; font-size: 0.95rem; } .empty-msg { text-align: center; color: ${({theme})=>theme.colorSubtitle}; margin: 0; }`;
const DetailOverlay = styled.div` position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(2px); `;
const DetailCard = styled(Card)` width: 600px; max-width: 90%; padding: 0; overflow: hidden; .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid ${({theme})=>theme.bg2}; h2{margin:0; font-size:1.2rem;} button{background:none; border:none; color:inherit; cursor:pointer;} } .items-list { max-height: 400px; overflow-y: auto; } .modal-total { text-align: right; font-size: 1.5rem; font-weight: 800; padding: 20px; background: ${({theme})=>theme.bgtotal}; border-top: 1px solid ${({theme})=>theme.bg2}; color: ${({theme})=>theme.primary}; }`;
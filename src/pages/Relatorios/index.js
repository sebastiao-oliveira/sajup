// src/pages/Relatorios/index.js

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Relatorios.module.scss';

const Relatorios = () => {
    const [parameters, setParameters] = useState({
        startDate: '',
        endDate: ''
    });
    const [data, setData] = useState({
        triunviratos: [],
        assistidos: [],
        processos: []
    });

    useEffect(() => {
        // Fetch data from localStorage
        const triunviratos = JSON.parse(localStorage.getItem('triunviratos')) || [];
        const assistidos = JSON.parse(localStorage.getItem('assistidos')) || [];
        const processos = JSON.parse(localStorage.getItem('processos')) || [];
        setData({ triunviratos, assistidos, processos });
    }, []);

    const handleGenerateReport = () => {
        const { startDate, endDate } = parameters;

        // Filter data by date range
        const filteredProcessos = data.processos.filter(processo => {
            const date = new Date(processo.dataEntrada);
            return (!startDate || date >= new Date(startDate)) &&
                   (!endDate || date <= new Date(endDate));
        });

        // Calculate report data
        const totalTriunviratos = data.triunviratos.length;
        const statusCounts = filteredProcessos.reduce((acc, processo) => {
            acc[processo.status] = (acc[processo.status] || 0) + 1;
            return acc;
        }, {});
        const assistidosComProcessoAberto = data.assistidos.filter(assistido =>
            filteredProcessos.some(processo => processo.assistidoId === assistido.id && processo.status === 'Em andamento')
        );

        // Prepare CSV content
        const csvContent = [
            ['Relatório de Registros'],
            [],
            ['Número de Triunviratos', totalTriunviratos],
            [],
            ['Status dos Processos'],
            ...Object.entries(statusCounts).map(([status, count]) => [status, count]),
            [],
            ['Assistidos com Processo em Aberto'],
            ['Nome', 'CPF'],
            ...assistidosComProcessoAberto.map(assistido => [assistido.nome, assistido.cpf])
        ]
            .map(row => row.join(','))
            .join('\n');

        // Generate CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `relatorio_registros.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h3>Gerar Relatórios</h3>
                <form>
                    <label>
                        Data de Início:
                        <input 
                            type="date" 
                            value={parameters.startDate} 
                            onChange={(e) => setParameters({ ...parameters, startDate: e.target.value })} 
                        />
                    </label>
                    <label>
                        Data de Fim:
                        <input 
                            type="date" 
                            value={parameters.endDate} 
                            onChange={(e) => setParameters({ ...parameters, endDate: e.target.value })} 
                        />
                    </label>
                    <button type="button" onClick={handleGenerateReport}>Gerar Relatório</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Relatorios;

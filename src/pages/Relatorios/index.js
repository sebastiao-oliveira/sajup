// src/pages/Relatorios/index.js

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Relatorios.module.scss';

const Relatorios = () => {
    const [parameters, setParameters] = useState({
        startDate: '',
        endDate: '',
        type: ''
    });

    const handleGenerateReport = () => {
        // Lógica para gerar o relatório
        console.log("Gerando relatório com parâmetros: ", parameters);
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
                    <label>
                        Tipo de Relatório:
                        <select 
                            value={parameters.type} 
                            onChange={(e) => setParameters({ ...parameters, type: e.target.value })}
                        >
                            <option value="">Selecione</option>
                            <option value="financeiro">Financeiro</option>
                            <option value="operacional">Operacional</option>
                        </select>
                    </label>
                    <button type="button" onClick={handleGenerateReport}>Gerar Relatório</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default Relatorios;

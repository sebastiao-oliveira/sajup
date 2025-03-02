// src/pages/NAJUP/index.js

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './NAJUP.module.scss';

const NAJUP = () => {
    const [selectedCategory, setSelectedCategory] = useState('Processos');

    const renderContent = () => {
        switch (selectedCategory) {
            case 'Processos':
                return <p>Cadastro e consulta de processos.</p>;
            case 'Membros':
                return <p>Cadastro e consulta de membros.</p>;
            case 'Registros':
                return <p>Registros de reuniões, atas, editais, modelos e anexos.</p>;
            default:
                return <p>Selecione uma categoria.</p>;
        }
    };

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <aside className={styles.menuLateral}>
                    <ul>
                        <li onClick={() => setSelectedCategory('Processos')}>Processos</li>
                        <li onClick={() => setSelectedCategory('Membros')}>Membros</li>
                        <li onClick={() => setSelectedCategory('Registros')}>Registros</li>
                    </ul>
                </aside>
                <section className={styles.contentArea}>
                    {renderContent()}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default NAJUP;

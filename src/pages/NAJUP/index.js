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
                // Simulação de uma lista de processos cadastrados
                return (
                    <ul>
                        <li>Processo 1 - Número: 12345</li>
                        <li>Processo 2 - Número: 67890</li>
                        <li>Processo 3 - Número: 11223</li>
                    </ul>
                );
            case 'Membros':
                return <p>Lista de membros será exibida aqui.</p>;
            case 'Assistidos':
                return <p>Lista de assistidos será exibida aqui.</p>;
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
                        {['Processos', 'Membros', 'Assistidos'].map((category) => (
                            <li
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={selectedCategory === category ? styles.active : ''}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => e.key === 'Enter' && setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
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

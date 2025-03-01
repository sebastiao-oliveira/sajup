// src/pages/Assistidos/index.js

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Assistidos.module.scss';

const Assistidos = () => {
    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h3>Cadastro e Consulta de Assistidos</h3>
                <button>Cadastrar Novo Assistido</button>
                <ul>
                    {/* Lista de assistidos */}
                    <li>Assistido 1</li>
                    <li>Assistido 2</li>
                </ul>
            </main>
            <Footer />
        </>
    );
};

export default Assistidos;

// src/pages/FichaPresenca/index.js

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './FichaPresenca.module.scss';

const FichaPresenca = () => {
    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h3>Ficha de Presença</h3>
                <form>
                    <label>
                        Nome:
                        <input type="text" placeholder="Digite o nome" />
                    </label>
                    <label>
                        Horário de Entrada:
                        <input type="time" />
                    </label>
                    <label>
                        Horário de Saída:
                        <input type="time" />
                    </label>
                    <button type="submit">Salvar</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default FichaPresenca;

// src/pages/Triunvirato/index.js

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Triunvirato.module.scss';

const Triunvirato = () => {
    const [triunviratos, setTriunviratos] = useState([]);

    useEffect(() => {
        const fetchTriunviratos = () => {
            const data = localStorage.getItem('triunviratos');
            if (data) {
                setTriunviratos(JSON.parse(data));
            }
        };

        fetchTriunviratos();
    }, []);

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h3>Gerenciar Triunviratos</h3>
                <section className={styles.triunviratosList}>
                    {triunviratos.map((triunvirato, index) => (
                        <div key={index} className={styles.triunvirato}>
                            <h4>{triunvirato.nome}</h4>
                            <p>Membros:</p>
                            <ul>
                                {triunvirato.membros.map((membro, i) => (
                                    <li key={i}>{membro}</li>
                                ))}
                            </ul>
                            <button>Editar</button>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Triunvirato;

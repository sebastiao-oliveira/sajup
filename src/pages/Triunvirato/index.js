// src/pages/Triunvirato/index.js

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styles from './Triunvirato.module.scss';
import { useNavigate } from 'react-router-dom';

const Triunvirato = () => {
    const [triunviratos, setTriunviratos] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
    const navigate = useNavigate(); // Add navigation hook

    useEffect(() => {
        const fetchTriunviratos = () => {
            const plantoes = JSON.parse(localStorage.getItem('plantoes')) || [];
            const allTriunviratos = plantoes.flatMap(plantao => plantao.triunviratos || []);
            setTriunviratos(allTriunviratos); // Atualiza o estado com todos os triunviratos
        };

        fetchTriunviratos();
    }, []);

    const handleNavigateToPlantao = (id) => {
        navigate(`/plantao/${id}`); // Navigate to the Plantão page
    };

    const filteredTriunviratos = triunviratos.filter(triunvirato =>
        triunvirato.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h3>Gerenciar Triunviratos</h3>
                <input
                    type="text"
                    placeholder="Pesquisar Triunvirato"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput} // Add a class for styling
                />
                <section className={styles.triunviratosList}>
                    {filteredTriunviratos.map((triunvirato, index) => (
                        <div key={index} className={styles.triunvirato}>
                            <h4>{triunvirato.codigo}</h4>
                            <p>Membros:</p>
                            <ul>
                                {triunvirato.sajuanos.map((sajuano, i) => (
                                    <li key={i}>{sajuano}</li>
                                ))}
                            </ul>
                            <p>Monitor:</p>
                            <ul>
                                {triunvirato.monitores.map((monitor, i) => (
                                    <li key={i}>{monitor}</li>
                                ))}
                            </ul>
                            <button onClick={() => handleNavigateToPlantao(triunvirato.id)}>Ir para Plantão</button>
                            <button>Editar</button>
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
};

export default Triunvirato;

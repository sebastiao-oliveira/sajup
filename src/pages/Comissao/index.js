import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Comissao.module.scss';

const Comissao = () => {
    const [mensagens, setMensagens] = useState([
        { nome: "Nome Sobrenome", texto: "Lorem ipsum dolor sit amet consectetur. At donec." },
        { nome: "Nome Sobrenome", texto: "Lorem ipsum dolor sit amet consectetur. Augue purus cras." },
        { nome: "Nome Sobrenome", texto: "Lorem ipsum dolor sit amet consectetur. A in est metus bibendum porta hac." },
        { nome: "Nome Sobrenome", texto: "Lorem ipsum dolor sit amet." },
        { nome: "Nome Sobrenome", texto: "Lorem ipsum dolor sit amet consectetur." }
    ]);

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h2>Comissão</h2>
                <p>
                    A Comissão de Arquivo é lorem ipsum dolor sit amet consectetur. Fusce porta cursus donec vitae. 
                    Etiam semper mollis quisque dictum libero laoreet.
                </p>
                <div className={styles.container}>
                    <aside className={styles.sidebar}>
                        <ul>
                            <li className={styles.active}>Arquivo</li>
                            <li>Capacitação</li>
                            <li>Certificados</li>
                            <li>Colaboração</li>
                            <li>Comunicação</li>
                            <li>Estrutura</li>
                            <li>Finanças</li>
                            <li>Formação</li>
                            <li>Software</li>
                        </ul>
                    </aside>
                    <section className={styles.chatContainer}>
                        <h3>Chat</h3>
                        <div className={styles.chatBox}>
                            {mensagens.map((msg, index) => (
                                <div key={index} className={styles.message}>
                                    <strong>{msg.nome}</strong>
                                    <p>{msg.texto}</p>
                                </div>
                            ))}
                        </div>
                        <input type="text" placeholder="Mensagem" className={styles.inputMessage} />
                    </section>
                    <aside className={styles.membersList}>
                        <h3>Arquivo</h3>
                        <ul>
                            <li>Nome Sobrenome</li>
                            <li>Nome Sobrenome</li>
                            <li>Nome Sobrenome</li>
                            <li>Nome Sobrenome</li>
                            <li>Nome Sobrenome</li>
                            <li>Nome Sobrenome</li>
                        </ul>
                        <button className={styles.addMemberBtn}>Adicionar membro</button>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Comissao;

import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Comissao.module.scss';

const Comissao = () => {
    const [currentComissao, setCurrentComissao] = useState('Arquivo');
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('comissaoMessages')) || {};
        setMessages(storedMessages[currentComissao] || []);
    }, [currentComissao]);

    useEffect(() => {
        // Auto-scroll para a última mensagem
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsg = {
            id: Date.now(),
            author: "Usuário Atual", // Aqui você pode pegar o nome do usuário logado
            text: newMessage,
            timestamp: new Date().toISOString(),
        };

        const storedMessages = JSON.parse(localStorage.getItem('comissaoMessages')) || {};
        const updatedMessages = {
            ...storedMessages,
            [currentComissao]: [...(storedMessages[currentComissao] || []), newMsg]
        };

        localStorage.setItem('comissaoMessages', JSON.stringify(updatedMessages));
        setMessages(updatedMessages[currentComissao]);
        setNewMessage('');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const comissoes = [
        'Arquivo', 'Capacitação', 'Certificados', 'Colaboração',
        'Comunicação', 'Estrutura', 'Finanças', 'Formação', 'Software'
    ];

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h2>{currentComissao}</h2>
                <div className={styles.container}>
                    <aside className={styles.sidebar}>
                        <ul>
                            {comissoes.map((comissao) => (
                                <li 
                                    key={comissao}
                                    className={currentComissao === comissao ? styles.active : ''}
                                    onClick={() => setCurrentComissao(comissao)}
                                >
                                    {comissao}
                                </li>
                            ))}
                        </ul>
                    </aside>
                    
                    <section className={styles.chatContainer}>
                        <h3>Discussões</h3>
                        <div className={styles.chatBox} ref={chatBoxRef}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={styles.message}>
                                    <div className={styles.messageHeader}>
                                        <strong>{msg.author}</strong>
                                        <span>{formatDate(msg.timestamp)}</span>
                                    </div>
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className={styles.messageForm}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Digite sua mensagem..."
                                className={styles.inputMessage}
                            />
                            <button type="submit" className={styles.sendButton}>
                                Enviar
                            </button>
                        </form>
                    </section>

                    <aside className={styles.membersList}>
                        <h3>{currentComissao}</h3>
                        <ul>
                            {/* Aqui você pode mapear os membros da comissão atual */}
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

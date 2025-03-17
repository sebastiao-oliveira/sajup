import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Processo.module.scss';
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlus, FaTimes } from 'react-icons/fa';

const Processos = () => {
    const [processos, setProcessos] = useState([]);
    const [assistidos, setAssistidos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        numero: '',
        assistidoId: '',
        status: 'Em andamento'
    });

    useEffect(() => {
        const storedProcessos = JSON.parse(localStorage.getItem('processos')) || [];
        const storedAssistidos = JSON.parse(localStorage.getItem('assistidos')) || [];
        setProcessos(storedProcessos);
        setAssistidos(storedAssistidos);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProcesso = {
            id: Date.now(),
            ...formData,
            assistido: assistidos.find(a => a.id === parseInt(formData.assistidoId))?.nome || ''
        };

        const updatedProcessos = [...processos, newProcesso];
        localStorage.setItem('processos', JSON.stringify(updatedProcessos));
        setProcessos(updatedProcessos);
        setShowForm(false);
        setFormData({
            nome: '',
            numero: '',
            assistidoId: '',
            status: 'Em andamento'
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este processo?')) {
            const filtered = processos.filter(processo => processo.id !== id);
            localStorage.setItem('processos', JSON.stringify(filtered));
            setProcessos(filtered);

            // Update related assistido
            const assistido = assistidos.find(a => 
                a.numeroProcesso === processos.find(p => p.id === id)?.numero
            );
            if (assistido) {
                const updatedAssistido = {
                    ...assistido,
                    nomeProcesso: '',
                    numeroProcesso: ''
                };
                const updatedAssistidos = assistidos.map(a => 
                    a.id === assistido.id ? updatedAssistido : a
                );
                localStorage.setItem('assistidos', JSON.stringify(updatedAssistidos));
                setAssistidos(updatedAssistidos);
            }
        }
    };

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <div className={styles.header}>
                    <h2>Gerenciamento de Processos</h2>
                    <button className={styles.addButton} onClick={() => setShowForm(true)}>
                        <FaPlus /> Novo Processo
                    </button>
                </div>

                <div className={styles.searchContainer}>
                    <div className={styles.searchBox}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Buscar processo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome do Processo</th>
                                <th>Número</th>
                                <th>Assistido</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processos
                                .filter(processo =>
                                    processo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    processo.numero.includes(searchTerm)
                                )
                                .map(processo => (
                                <tr key={processo.id}>
                                    <td>{processo.nome}</td>
                                    <td>{processo.numero}</td>
                                    <td>{processo.assistido}</td>
                                    <td>{processo.status}</td>
                                    <td className={styles.actions}>
                                        <button title="Ver detalhes"><FaEye /></button>
                                        <button title="Editar"><FaEdit /></button>
                                        <button title="Excluir" onClick={() => handleDelete(processo.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showForm && (
                    <div className={styles.formOverlay}>
                        <div className={styles.formContainer}>
                            <button className={styles.closeButton} onClick={() => setShowForm(false)}>
                                <FaTimes />
                            </button>
                            <h3>Cadastrar Novo Processo</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Nome do processo"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Número do processo"
                                    value={formData.numero}
                                    onChange={(e) => setFormData({...formData, numero: e.target.value})}
                                    required
                                />
                                <select
                                    value={formData.assistidoId}
                                    onChange={(e) => setFormData({...formData, assistidoId: e.target.value})}
                                    required
                                >
                                    <option value="">Selecione um assistido</option>
                                    {assistidos.map(assistido => (
                                        <option key={assistido.id} value={assistido.id}>
                                            {assistido.nome}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Arquivado">Arquivado</option>
                                </select>
                                <button type="submit">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Processos;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Processo.module.scss';
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlus, FaTimes } from 'react-icons/fa';

const Processos = () => {
    const navigate = useNavigate();
    const [processos, setProcessos] = useState([]);
    const [assistidos, setAssistidos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [searchAssistido, setSearchAssistido] = useState('');
    const [selectedAssistido, setSelectedAssistido] = useState(null);
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

    const handleAssistidoSelect = (e) => {
        const assistidoId = e.target.value;
        if (assistidoId) {
            const selectedAssistido = assistidos.find(a => a.id === parseInt(assistidoId));
            if (selectedAssistido) {
                setFormData({
                    ...formData,
                    assistidoId,
                    nome: selectedAssistido.nomeProcesso || '',
                    numero: selectedAssistido.numeroProcesso || '',
                    status: selectedAssistido.status === 'Ativo' ? 'Em andamento' : selectedAssistido.status
                });
            }
        } else {
            // Reset form if no assistido selected
            setFormData({
                nome: '',
                numero: '',
                assistidoId: '',
                status: 'Em andamento'
            });
        }
    };

    const handleSearchAssistido = (e) => {
        const search = e.target.value;
        setSearchAssistido(search);
        setSelectedAssistido(null);

        if (search.length >= 3) {
            const found = assistidos.find(assistido => 
                assistido.cpf.includes(search) || 
                assistido.nome.toLowerCase().includes(search.toLowerCase())
            );
            
            if (found) {
                setSelectedAssistido(found);
                setFormData({
                    ...formData,
                    assistidoId: found.id,
                    nome: found.nomeProcesso || '',
                    numero: found.numeroProcesso || '',
                    status: found.status === 'Ativo' ? 'Em andamento' : found.status
                });
            }
        }
    };

    const handleNewProcesso = () => {
        navigate('/assistidos', { 
            state: { 
                fromProcessos: true,
                message: 'Para cadastrar um novo processo, primeiro selecione ou cadastre um assistido.' 
            } 
        });
    };

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <div className={styles.header}>
                    <h2>Gerenciamento de Processos</h2>
                    <button className={styles.addButton} onClick={handleNewProcesso}>
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
                                <div className={styles.searchAssistido}>
                                    <input
                                        type="text"
                                        placeholder="Buscar assistido por CPF ou nome"
                                        value={searchAssistido}
                                        onChange={handleSearchAssistido}
                                    />
                                </div>
                                
                                {selectedAssistido && (
                                    <div className={styles.assistidoInfo}>
                                        <p>Assistido encontrado:</p>
                                        <p><strong>Nome:</strong> {selectedAssistido.nome}</p>
                                        <p><strong>CPF:</strong> {selectedAssistido.cpf}</p>
                                    </div>
                                )}

                                <input
                                    type="text"
                                    placeholder="Nome do processo"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                    required
                                    disabled={!selectedAssistido}
                                />
                                <input
                                    type="text"
                                    placeholder="Número do processo"
                                    value={formData.numero}
                                    onChange={(e) => setFormData({...formData, numero: e.target.value})}
                                    required
                                    disabled={!selectedAssistido}
                                />
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    disabled={!selectedAssistido}
                                >
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Arquivado">Arquivado</option>
                                </select>
                                <button type="submit" disabled={!selectedAssistido}>
                                    Cadastrar
                                </button>
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

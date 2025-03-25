import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Assistidos.module.scss';
import { FaSearch, FaEdit, FaTrash, FaEye, FaUserPlus, FaTimes } from 'react-icons/fa';
import StorageService from '../../services/storage';

const Assistidos = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [assistidos, setAssistidos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        nomeProcesso: '',
        numeroProcesso: '',
        status: 'Ativo',
        rg: '',
        emissor: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        complemento: ''
    });
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const storedAssistidos = StorageService.get('assistidos');
        setAssistidos(storedAssistidos);
    }, []);

    useEffect(() => {
        if (location.state?.fromProcessos) {
            setNotification(location.state.message);
            setShowForm(true);
        }
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAssistido = {
            id: Date.now(),
            ...formData,
            dataEntrada: new Date().toISOString().split('T')[0]
        };

        const updatedAssistidos = [...assistidos, newAssistido];
        StorageService.set('assistidos', updatedAssistidos);
        setAssistidos(updatedAssistidos);

        if (formData.nomeProcesso && formData.numeroProcesso) {
            const processos = StorageService.get('processos');
            const newProcesso = {
                id: Date.now() + 1,
                nome: formData.nomeProcesso,
                numero: formData.numeroProcesso,
                assistidoId: newAssistido.id,
                assistido: newAssistido.nome,
                status: 'Em andamento'
            };
            StorageService.set('processos', [...processos, newProcesso]);
        }

        setShowForm(false);
        setFormData({
            nome: '',
            cpf: '',
            nomeProcesso: '',
            numeroProcesso: '',
            status: 'Ativo',
            rg: '',
            emissor: '',
            dataNascimento: '',
            telefone: '',
            email: '',
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            complemento: ''
        });
    };

    const handleDelete = (id) => {
        // Delete assistido
        const filtered = assistidos.filter(assistido => assistido.id !== id);
        localStorage.setItem('assistidos', JSON.stringify(filtered));
        setAssistidos(filtered);

        // Delete related processos
        const storedProcessos = JSON.parse(localStorage.getItem('processos')) || [];
        const filteredProcessos = storedProcessos.filter(processo => processo.assistidoId !== id);
        localStorage.setItem('processos', JSON.stringify(filteredProcessos));
    };

    const handleProcessoClick = (assistido) => {
        if (assistido.numeroProcesso) {
            const storedProcessos = JSON.parse(localStorage.getItem('processos')) || [];
            const processo = storedProcessos.find(p => p.numero === assistido.numeroProcesso);
            
            if (processo) {
                navigate('/processos', {
                    state: { 
                        selectedProcesso: processo,
                        openDetails: true
                    }
                });
            }
        }
    };

    const handleStatusChange = (assistidoId, newStatus) => {
        // Update assistido status
        const updatedAssistidos = assistidos.map(assistido => {
            if (assistido.id === assistidoId) {
                return { ...assistido, status: newStatus };
            }
            return assistido;
        });
        setAssistidos(updatedAssistidos);

        // Update related processo status
        const storedProcessos = JSON.parse(localStorage.getItem('processos')) || [];
        const updatedProcessos = storedProcessos.map(processo => {
            if (processo.assistidoId === assistidoId) {
                return { ...processo, status: newStatus === 'Ativo' ? 'Em andamento' : newStatus };
            }
            return processo;
        });
        localStorage.setItem('processos', JSON.stringify(updatedProcessos));
    };

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                {notification && (
                    <div className={styles.notification}>
                        {notification}
                    </div>
                )}
                <div className={styles.header}>
                    <h2>Gerenciamento de Assistidos</h2>
                    <button className={styles.addButton} onClick={() => setShowForm(true)}>
                        <FaUserPlus /> Novo Assistido
                    </button>
                </div>

                {showForm && (
                    <div className={styles.formOverlay}>
                        <div className={styles.formContainer}>
                            <button className={styles.closeButton} onClick={() => setShowForm(false)}>
                                <FaTimes />
                            </button>
                            <h3>Cadastrar Novo Assistido</h3>
                            <form onSubmit={handleSubmit} className={styles.responsiveForm}>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        placeholder="Nome completo"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="CPF"
                                        value={formData.cpf}
                                        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        placeholder="RG"
                                        value={formData.rg}
                                        onChange={(e) => setFormData({...formData, rg: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Emissor do RG"
                                        value={formData.emissor}
                                        onChange={(e) => setFormData({...formData, emissor: e.target.value})}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="date"
                                        placeholder="Data de Nascimento"
                                        value={formData.dataNascimento}
                                        onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Telefone"
                                        value={formData.telefone}
                                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        placeholder="CEP"
                                        value={formData.cep}
                                        onChange={(e) => setFormData({...formData, cep: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Rua/Avenida"
                                        value={formData.rua}
                                        onChange={(e) => setFormData({...formData, rua: e.target.value})}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        placeholder="Número"
                                        value={formData.numero}
                                        onChange={(e) => setFormData({...formData, numero: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Bairro"
                                        value={formData.bairro}
                                        onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        placeholder="Complemento"
                                        value={formData.complemento}
                                        onChange={(e) => setFormData({...formData, complemento: e.target.value})}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        placeholder="Nome do Processo"
                                        value={formData.nomeProcesso}
                                        onChange={(e) => setFormData({...formData, nomeProcesso: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Número do Processo"
                                        value={formData.numeroProcesso}
                                        onChange={(e) => setFormData({...formData, numeroProcesso: e.target.value})}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="Ativo">Ativo</option>
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Concluído">Concluído</option>
                                    </select>
                                </div>
                                <button type="submit">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                )}

                <div className={styles.searchContainer}>
                    <div className={styles.searchBox}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Buscar assistido..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Processo</th>
                                <th>Nº Processo</th>
                                <th>Data de Entrada</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assistidos
                                .filter(assistido => 
                                    assistido.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    assistido.cpf.includes(searchTerm)
                                )
                                .map(assistido => (
                                <tr key={assistido.id}>
                                    <td>{assistido.nome}</td>
                                    <td>{assistido.cpf}</td>
                                    <td 
                                        className={assistido.nomeProcesso ? styles.clickableCell : ''}
                                        onClick={() => handleProcessoClick(assistido)}
                                    >
                                        {assistido.nomeProcesso}
                                    </td>
                                    <td 
                                        className={assistido.numeroProcesso ? styles.clickableCell : ''}
                                        onClick={() => handleProcessoClick(assistido)}
                                    >
                                        {assistido.numeroProcesso}
                                    </td>
                                    <td>{assistido.dataEntrada}</td>
                                    <td>
                                        <select 
                                            value={assistido.status}
                                            onChange={(e) => handleStatusChange(assistido.id, e.target.value)}
                                        >
                                            <option value="Ativo">Ativo</option>
                                            <option value="Em andamento">Em andamento</option>
                                            <option value="Concluído">Concluído</option>
                                        </select>
                                    </td>
                                    <td className={styles.actions}>
                                        <button title="Ver detalhes"><FaEye /></button>
                                        <button title="Editar"><FaEdit /></button>
                                        <button title="Excluir" onClick={() => handleDelete(assistido.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Assistidos;

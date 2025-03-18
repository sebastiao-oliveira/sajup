import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Processo.module.scss';
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlus, FaTimes, FaPaperclip } from 'react-icons/fa';

const formatTimeAgo = (date) => {
    const now = new Date();
    const uploadDate = new Date(date);
    const diffInMinutes = Math.floor((now - uploadDate) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
        return `há ${diffInMinutes} minutos`;
    } else if (diffInHours < 24) {
        return `há ${diffInHours} horas`;
    } else {
        return `há ${diffInDays} dias`;
    }
};

const Processos = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProcesso, setEditingProcesso] = useState(null);

    useEffect(() => {
        const storedProcessos = JSON.parse(localStorage.getItem('processos')) || [];
        const storedAssistidos = JSON.parse(localStorage.getItem('assistidos')) || [];
        setProcessos(storedProcessos);
        setAssistidos(storedAssistidos);

        // Check if we have a selected processo from navigation
        if (location.state?.selectedProcesso && location.state?.openDetails) {
            setEditingProcesso({
                ...location.state.selectedProcesso,
                descricao: location.state.selectedProcesso.descricao || '',
                documentos: location.state.selectedProcesso.documentos || []
            });
            setShowEditForm(true);
        }
    }, [location]);

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

    const handleEdit = (processo) => {
        setEditingProcesso({
            ...processo,
            descricao: processo.descricao || '',
            documentos: processo.documentos || []
        });
        setShowEditForm(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedProcessos = processos.map(p => 
            p.id === editingProcesso.id ? editingProcesso : p
        );
        localStorage.setItem('processos', JSON.stringify(updatedProcessos));
        setProcessos(updatedProcessos);
        setShowEditForm(false);
        setEditingProcesso(null);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newDocs = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toISOString()
        }));

        setEditingProcesso(prev => ({
            ...prev,
            documentos: [...(prev.documentos || []), ...newDocs]
        }));
    };

    const handleRemoveDocument = (docId) => {
        setEditingProcesso(prev => ({
            ...prev,
            documentos: prev.documentos.filter(doc => doc.id !== docId)
        }));
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
                                        <button title="Editar" onClick={() => handleEdit(processo)}><FaEdit /></button>
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

                {showEditForm && (
                    <div className={styles.formOverlay}>
                        <div className={styles.formContainer}>
                            <div className={styles.editHeader}>
                                <div className={styles.processInfo}>
                                    <h3>Editar Processo</h3>
                                    <span>Assistido: {editingProcesso.assistido}</span>
                                </div>
                                <button className={styles.closeButton} onClick={() => setShowEditForm(false)}>
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleEditSubmit}>
                                <div className={styles.twoColumns}>
                                    <input
                                        type="text"
                                        placeholder="Nome do processo"
                                        value={editingProcesso.nome}
                                        onChange={(e) => setEditingProcesso({
                                            ...editingProcesso,
                                            nome: e.target.value
                                        })}
                                        required
                                    />
                                    <select
                                        value={editingProcesso.status}
                                        onChange={(e) => setEditingProcesso({
                                            ...editingProcesso,
                                            status: e.target.value
                                        })}
                                    >
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Concluído">Concluído</option>
                                        <option value="Arquivado">Arquivado</option>
                                    </select>
                                </div>

                                <textarea
                                    placeholder="Descrição detalhada do processo"
                                    value={editingProcesso.descricao}
                                    onChange={(e) => setEditingProcesso({
                                        ...editingProcesso,
                                        descricao: e.target.value
                                    })}
                                    rows={6}
                                />

                                <div className={styles.documentSection}>
                                    <h4><FaPaperclip /> Documentos do Processo</h4>
                                    <div className={styles.fileUpload}>
                                        <label htmlFor="file-upload">
                                            <FaPlus /> Arraste arquivos ou clique para anexar
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            multiple
                                            onChange={handleFileUpload}
                                        />
                                    </div>

                                    {editingProcesso.documentos?.length > 0 && (
                                        <div className={styles.documentList}>
                                            {editingProcesso.documentos.map(doc => (
                                                <div key={doc.id} className={styles.documentItem}>
                                                    <div className={styles.docInfo}>
                                                        <span className={styles.docName}>{doc.name}</span>
                                                        <span className={styles.docMeta}>
                                                            {formatTimeAgo(doc.uploadDate)}
                                                        </span>
                                                    </div>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleRemoveDocument(doc.id)}
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button type="submit">Salvar Alterações</button>
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

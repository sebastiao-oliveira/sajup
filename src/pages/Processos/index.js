// Importação de bibliotecas e componentes necessários
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Processo.module.scss';
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlus, FaTimes, FaPaperclip, FaDownload } from 'react-icons/fa';
import StorageService from '../../services/storage';

// Estado inicial do formulário de processo
const initialFormState = {
    nome: '',
    numero: '',
    assistidoId: '',
    status: 'Em andamento'
};

// Função para formatar o tempo decorrido em formato legível
const formatTimeAgo = date => {
    const periods = {
        minuto: 60,
        hora: 3600,
        dia: 86400
    };
    
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    for (const [unit, seconds_in_unit] of Object.entries(periods)) {
        const interval = Math.floor(seconds / seconds_in_unit);
        if (interval >= 1) {
            return `há ${interval} ${unit}${interval !== 1 ? 's' : ''}`;
        }
    }
    return 'agora mesmo';
};

// Add this new component above the Processos component
const DocumentLinks = ({ documents }) => {
    return (
        <div className={styles.documentLinks}>
            <span className={styles.documentCount}>
                {documents?.length > 0 ? `${documents.length} documento(s)` : 'Sem documentos'}
            </span>
            {documents?.length > 0 && (
                <div className={styles.linksList}>
                    {documents.map(doc => (
                        <a 
                            key={doc.id}
                            href={doc.filePath}
                            download={doc.fileName}
                            className={styles.docLink}
                        >
                            {doc.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

// Componente principal de gerenciamento de processos
const Processos = () => {
    // Hooks de navegação e localização
    const navigate = useNavigate();
    const location = useLocation();
    // Estados para gerenciar processos e assistidos
    const [processos, setProcessos] = useState(() => StorageService.get('processos'));
    const [assistidos, setAssistidos] = useState(() => StorageService.get('assistidos'));
    const [searchTerm, setSearchTerm] = useState('');
    const [formState, setFormState] = useState({
        showForm: false,
        showEditForm: false,
        searchAssistido: '',
        selectedAssistido: null,
        formData: initialFormState,
        editingProcesso: null
    });

    // Atualizar onde houver setProcessos
    const updateProcessos = (newProcessos) => {
        StorageService.set('processos', newProcessos);
        setProcessos(newProcessos);
    };

    // Atualizar onde houver setAssistidos
    const updateAssistidos = (newAssistidos) => {
        StorageService.set('assistidos', newAssistidos);
        setAssistidos(newAssistidos);
    };

    // Memoriza a lista de processos filtrados para melhor performance
    const filteredProcessos = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        return processos.filter(processo =>
            processo.nome.toLowerCase().includes(searchLower) ||
            processo.numero.includes(searchTerm)
        );
    }, [processos, searchTerm]);

    // Função otimizada para atualizar o estado do formulário
    const updateFormState = useCallback((updates) => {
        setFormState(prev => ({ ...prev, ...updates }));
    }, []);

    // Efeito para verificar se há um processo selecionado na navegação
    useEffect(() => {
        // Check if we have a selected processo from navigation
        if (location.state?.selectedProcesso && location.state?.openDetails) {
            updateFormState({
                editingProcesso: {
                    ...location.state.selectedProcesso,
                    descricao: location.state.selectedProcesso.descricao || '',
                    documentos: location.state.selectedProcesso.documentos || []
                },
                showEditForm: true
            });
        }
    }, [location, updateFormState]);

    // Manipulador de submissão do formulário de novo processo
    const handleSubmit = (e) => {
        e.preventDefault();
        const newProcesso = {
            id: Date.now(),
            ...formState.formData,
            assistido: assistidos.find(a => a.id === parseInt(formState.formData.assistidoId))?.nome || ''
        };

        const updatedProcessos = [...processos, newProcesso];
        updateProcessos(updatedProcessos);
        updateFormState({
            showForm: false,
            formData: initialFormState
        });
    };

    // Manipulador para exclusão de processo
    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este processo?')) {
            const filtered = processos.filter(processo => processo.id !== id);
            updateProcessos(filtered);

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
                updateAssistidos(updatedAssistidos);
            }
        }
    };

    // Manipulador de seleção de assistido
    const handleAssistidoSelect = (e) => {
        const assistidoId = e.target.value;
        if (assistidoId) {
            const selectedAssistido = assistidos.find(a => a.id === parseInt(assistidoId));
            if (selectedAssistido) {
                updateFormState({
                    formData: {
                        ...formState.formData,
                        assistidoId,
                        nome: selectedAssistido.nomeProcesso || '',
                        numero: selectedAssistido.numeroProcesso || '',
                        status: selectedAssistido.status === 'Ativo' ? 'Em andamento' : selectedAssistido.status
                    }
                });
            }
        } else {
            // Reset form if no assistido selected
            updateFormState({
                formData: initialFormState
            });
        }
    };

    // Manipulador de busca de assistido
    const handleSearchAssistido = useCallback((e) => {
        const search = e.target.value;
        if (search.length >= 3) {
            const found = assistidos.find(assistido => 
                assistido.cpf.includes(search) || 
                assistido.nome.toLowerCase().includes(search.toLowerCase())
            );
            
            updateFormState({
                searchAssistido: search,
                selectedAssistido: found,
                formData: found ? {
                    ...initialFormState,
                    assistidoId: found.id,
                    nome: found.nomeProcesso || '',
                    numero: found.numeroProcesso || '',
                    status: found.status === 'Ativo' ? 'Em andamento' : found.status
                } : initialFormState
            });
        } else {
            updateFormState({
                searchAssistido: search,
                selectedAssistido: null,
                formData: initialFormState
            });
        }
    }, [assistidos, updateFormState]);

    // Manipulador para criar novo processo
    const handleNewProcesso = () => {
        navigate('/assistidos', { 
            state: { 
                fromProcessos: true,
                message: 'Para cadastrar um novo processo, primeiro selecione ou cadastre um assistido.' 
            } 
        });
    };

    // Manipulador para edição de processo
    const handleEdit = (processo) => {
        updateFormState({
            editingProcesso: {
                ...processo,
                descricao: processo.descricao || '',
                documentos: processo.documentos || []
            },
            showEditForm: true
        });
    };

    const handleStatusChange = (processo, newStatus) => {
        const updatedProcessos = processos.map(p => 
            p.id === processo.id ? { ...p, status: newStatus } : p
        );
        updateProcessos(updatedProcessos);

        const updatedAssistidos = assistidos.map(assistido => {
            if (assistido.id === parseInt(processo.assistidoId)) {
                return { 
                    ...assistido, 
                    status: newStatus === 'Em andamento' ? 'Ativo' : newStatus 
                };
            }
            return assistido;
        });
        updateAssistidos(updatedAssistidos);
    };

    // Manipulador de submissão do formulário de edição
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedProcessos = processos.map(p => 
            p.id === formState.editingProcesso.id 
                ? { ...p, ...formState.editingProcesso }
                : p
        );
        updateProcessos(updatedProcessos);
        handleStatusChange(formState.editingProcesso, formState.editingProcesso.status);
        updateFormState({
            showEditForm: false,
            editingProcesso: null
        });
    };

    // Modificar o handleFileUpload para handleAddDocument
    const handleAddDocument = (e) => {
        e.preventDefault();
        const documentName = e.target.documentName.value;
        const fileInput = e.target.documentFile;
        
        if (documentName && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const newDoc = {
                id: Date.now() + Math.random(),
                name: documentName,
                fileName: file.name,
                filePath: URL.createObjectURL(file),
                localPath: file.webkitRelativePath || file.name,
                uploadDate: new Date().toISOString(),
                size: file.size
            };

            updateFormState({
                editingProcesso: {
                    ...formState.editingProcesso,
                    documentos: [...(formState.editingProcesso?.documentos || []), newDoc]
                }
            });

            // Reset form
            e.target.reset();
        }
    };

    // Manipulador para remover documentos
    const handleRemoveDocument = (docId) => {
        updateFormState({
            editingProcesso: {
                ...formState.editingProcesso,
                documentos: formState.editingProcesso.documentos.filter(doc => doc.id !== docId)
            }
        });
    };

    // Add handleDownloadDocument
    const handleDownloadDocument = (doc) => {
        StorageService.downloadDocument(doc.fileData, doc.fileName);
    };

    // Renderização do componente
    return (
        <>
            {/* Componente de cabeçalho */}
            <Header />
            <main className={styles.containerMain}>
                {/* Cabeçalho da página */}
                <div className={styles.header}>
                    <h2>Gerenciamento de Processos</h2>
                    <button className={styles.addButton} onClick={handleNewProcesso}>
                        <FaPlus /> Novo Processo
                    </button>
                </div>

                {/* Barra de pesquisa */}
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

                {/* Tabela de processos */}
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome do Processo</th>
                                <th>Número</th>
                                <th>Assistido</th>
                                <th>Status</th>
                                <th>Documentos</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProcessos.map(processo => (
                                <tr key={processo.id}>
                                    <td>{processo.nome}</td>
                                    <td>{processo.numero}</td>
                                    <td>{processo.assistido}</td>
                                    <td>
                                        <select 
                                            value={processo.status}
                                            onChange={(e) => handleStatusChange(processo, e.target.value)}
                                        >
                                            <option value="Em andamento">Em andamento</option>
                                            <option value="Concluído">Concluído</option>
                                            <option value="Arquivado">Arquivado</option>
                                        </select>
                                    </td>
                                    <td><DocumentLinks documents={processo.documentos} /></td>
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

                {/* Formulário de cadastro de novo processo */}
                {formState.showForm && (
                    <div className={styles.formOverlay}>
                        <div className={styles.formContainer}>
                            <button className={styles.closeButton} onClick={() => updateFormState({ showForm: false })}>
                                <FaTimes />
                            </button>
                            <h3>Cadastrar Novo Processo</h3>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.searchAssistido}>
                                    <input
                                        type="text"
                                        placeholder="Buscar assistido por CPF ou nome"
                                        value={formState.searchAssistido}
                                        onChange={handleSearchAssistido}
                                    />
                                </div>
                                
                                {formState.selectedAssistido && (
                                    <div className={styles.assistidoInfo}>
                                        <p>Assistido encontrado:</p>
                                        <p><strong>Nome:</strong> {formState.selectedAssistido.nome}</p>
                                        <p><strong>CPF:</strong> {formState.selectedAssistido.cpf}</p>
                                    </div>
                                )}

                                <input
                                    type="text"
                                    placeholder="Nome do processo"
                                    value={formState.formData.nome}
                                    onChange={(e) => updateFormState({ formData: { ...formState.formData, nome: e.target.value } })}
                                    required
                                    disabled={!formState.selectedAssistido}
                                />
                                <input
                                    type="text"
                                    placeholder="Número do processo"
                                    value={formState.formData.numero}
                                    onChange={(e) => updateFormState({ formData: { ...formState.formData, numero: e.target.value } })}
                                    required
                                    disabled={!formState.selectedAssistido}
                                />
                                <select
                                    value={formState.formData.status}
                                    onChange={(e) => updateFormState({ formData: { ...formState.formData, status: e.target.value } })}
                                    disabled={!formState.selectedAssistido}
                                >
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluído">Concluído</option>
                                    <option value="Arquivado">Arquivado</option>
                                </select>
                                <button type="submit" disabled={!formState.selectedAssistido}>
                                    Cadastrar
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Formulário de edição de processo */}
                {formState.showEditForm && (
                    <div className={styles.formOverlay}>
                        <div className={styles.formContainer}>
                            <div className={styles.editHeader}>
                                <div className={styles.processInfo}>
                                    <h3>Editar Processo</h3>
                                    <span>Assistido: {formState.editingProcesso.assistido}</span>
                                </div>
                                <button className={styles.closeButton} onClick={() => updateFormState({ showEditForm: false })}>
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleEditSubmit}>
                                <div className={styles.twoColumns}>
                                    <input
                                        type="text"
                                        placeholder="Nome do processo"
                                        value={formState.editingProcesso.nome}
                                        onChange={(e) => updateFormState({
                                            editingProcesso: {
                                                ...formState.editingProcesso,
                                                nome: e.target.value
                                            }
                                        })}
                                        required
                                    />
                                    <select
                                        value={formState.editingProcesso.status}
                                        onChange={(e) => updateFormState({
                                            editingProcesso: {
                                                ...formState.editingProcesso,
                                                status: e.target.value
                                            }
                                        })}
                                    >
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Concluído">Concluído</option>
                                        <option value="Arquivado">Arquivado</option>
                                    </select>
                                </div>

                                <textarea
                                    placeholder="Descrição detalhada do processo"
                                    value={formState.editingProcesso.descricao}
                                    onChange={(e) => updateFormState({
                                        editingProcesso: {
                                            ...formState.editingProcesso,
                                            descricao: e.target.value
                                        }
                                    })}
                                    rows={6}
                                />

                                <div className={styles.documentSection}>
                                    <h4><FaPaperclip /> Documentos do Processo</h4>
                                    <form onSubmit={handleAddDocument} className={styles.documentForm}>
                                        <div className={styles.fileUploadContainer}>
                                            <input
                                                type="text"
                                                name="documentName"
                                                placeholder="Nome do documento"
                                                required
                                            />
                                            <div className={styles.fileInput}>
                                                <label htmlFor="documentFile">
                                                    <FaPaperclip /> Selecionar arquivo
                                                </label>
                                                <input
                                                    type="file"
                                                    name="documentFile"
                                                    id="documentFile"
                                                    required
                                                    accept=".pdf,.doc,.docx,.txt"
                                                />
                                            </div>
                                            <button type="submit">
                                                <FaPlus /> Anexar Documento
                                            </button>
                                        </div>
                                    </form>

                                    {formState.editingProcesso.documentos?.length > 0 && (
                                        <div className={styles.documentList}>
                                            {formState.editingProcesso.documentos.map(doc => (
                                                <div key={doc.id} className={styles.documentItem}>
                                                    <div className={styles.docInfo}>
                                                        <span className={styles.docName}>{doc.name}</span>
                                                        <span className={styles.docPath}>{doc.localPath}</span>
                                                        <div className={styles.docActions}>
                                                            <a 
                                                                href={doc.filePath} 
                                                                download={doc.fileName}
                                                                className={styles.docLink}
                                                            >
                                                                <FaDownload /> Baixar
                                                            </a>
                                                            <span className={styles.docMeta}>
                                                                {formatTimeAgo(doc.uploadDate)} • {(doc.size / 1024 / 1024).toFixed(2)}MB
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleRemoveDocument(doc.id)}
                                                        className={styles.removeButton}
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
            {/* Componente de rodapé */}
            <Footer />
        </>
    );
};

export default Processos;

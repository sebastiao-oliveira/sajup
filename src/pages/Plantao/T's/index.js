import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputMask } from 'primereact/inputmask';
import { FiTag } from "react-icons/fi";
import { IoIosCalendar, IoMdTrash } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { TiArrowBack } from "react-icons/ti";
import { MdModeEditOutline, MdAddBox } from "react-icons/md";
import { BsArrowReturnRight } from "react-icons/bs";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import { AiOutlineDelete } from 'react-icons/ai';
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import styles from './Ts.module.scss'

const Ts = () => {
    const navigate = useNavigate();
    const {params} = useParams();
    const infoDuty = params.split(',');
    const [plantao, setPlantao] = useState({
        id: infoDuty[0],
        diaSemana: infoDuty[1],
        horario: infoDuty[2],
        coordenador: "João Carlos Mercês Almeida dos Santos",
        triunviratos: []
    });
    const [showAssistidos, setShowAssistidos] = useState(false);
    const [showEditDuty, setShowEditDuty] = useState(false);
    const [showAddTriunvirato, setShowAddTriunvirato] = useState(false);
    const [editingTriunvirato, setEditingTriunvirato] = useState(null);
    const [showEditTriunvirato, setShowEditTriunvirato] = useState(false);
    const [availableMembers, setAvailableMembers] = useState({
        sajuanos: [],
        monitores: []
    });

    useEffect(() => {
        // Carregar membros e dados do plantão
        const members = JSON.parse(localStorage.getItem('members')) || [];
        setAvailableMembers({
            sajuanos: members.filter(m => m.memberType === 'sajuano'),
            monitores: members.filter(m => m.memberType === 'monitor')
        });

        const savedPlantoes = JSON.parse(localStorage.getItem('plantoes')) || [];
        const currentPlantao = savedPlantoes.find(p => p.id === infoDuty[0]) || {
            id: infoDuty[0],
            diaSemana: infoDuty[1],
            horario: infoDuty[2],
            coordenador: "João Carlos Mercês Almeida dos Santos",
            triunviratos: []
        };

        // Atualizar triunviratos no estado do plantão
        setPlantao(currentPlantao);

        // Se não encontrar o plantão, criar um novo e salvar no localStorage
        if (!savedPlantoes.find(p => p.id === infoDuty[0])) {
            savedPlantoes.push(currentPlantao);
            localStorage.setItem('plantoes', JSON.stringify(savedPlantoes));
        }
    }, [infoDuty]);

    const handleAddTriunvirato = () => {
        const newTriunvirato = {
            id: Date.now().toString(),
            codigo: `T-${(plantao.triunviratos?.length || 0) + 1}`,
            sajuanos: [],
            monitores: [],
            assistidos: []
        };

        const updatedPlantao = {
            ...plantao,
            triunviratos: [...(plantao.triunviratos || []), newTriunvirato]
        };

        // Atualizar no localStorage imediatamente
        const plantoes = JSON.parse(localStorage.getItem('plantoes')) || [];
        const updatedPlantoes = plantoes.map(p => 
            p.id === plantao.id ? updatedPlantao : p
        );
        
        if (!plantoes.find(p => p.id === plantao.id)) {
            updatedPlantoes.push(updatedPlantao);
        }
        
        localStorage.setItem('plantoes', JSON.stringify(updatedPlantoes));
        setPlantao(updatedPlantao);
        setShowAddTriunvirato(false);
    };

    const handleDeleteDuty = () => {
        if (window.confirm('Tem certeza que deseja excluir este plantão?')) {
            const plantoes = JSON.parse(localStorage.getItem('plantoes')) || [];
            const updatedPlantoes = plantoes.filter(p => p.id !== plantao.id);
            localStorage.setItem('plantoes', JSON.stringify(updatedPlantoes));
            navigate('/plantao');
        }
    };

    const handleEditTriunvirato = (triunvirato) => {
        setEditingTriunvirato(triunvirato);
        setShowEditTriunvirato(true);
    };

    const handleSaveTriunvirato = (e) => {
        e.preventDefault();
        
        // Pegar os valores selecionados diretamente dos selects
        const selectedSajuanos = Array.from(e.target.sajuanos.selectedOptions).map(option => option.value);
        const selectedMonitor = e.target.monitor.value;

        const updatedTriunvirato = {
            ...editingTriunvirato,
            sajuanos: selectedSajuanos,
            monitores: selectedMonitor ? [selectedMonitor] : [],
            assistidos: editingTriunvirato.assistidos || [] // Mantém os assistidos existentes ou inicia array vazio
        };

        const updatedPlantao = {
            ...plantao,
            triunviratos: plantao.triunviratos.map(t => 
                t.id === editingTriunvirato.id ? updatedTriunvirato : t
            )
        };

        setPlantao(updatedPlantao);

        // Atualizar no localStorage
        const plantoes = JSON.parse(localStorage.getItem('plantoes')) || [];
        const updatedPlantoes = plantoes.map(p => 
            p.id === plantao.id ? updatedPlantao : p
        );
        
        if (!plantoes.find(p => p.id === plantao.id)) {
            updatedPlantoes.push(updatedPlantao);
        }
        
        localStorage.setItem('plantoes', JSON.stringify(updatedPlantoes));
        setShowEditTriunvirato(false);
        setEditingTriunvirato(null);
    };

    const handleDeleteTriunvirato = (triunviratoId) => {
        if (window.confirm('Tem certeza que deseja excluir este triunvirato?')) {
            const updatedPlantao = {
                ...plantao,
                triunviratos: plantao.triunviratos.filter(t => t.id !== triunviratoId)
            };

            // Atualizar localStorage
            const plantoes = JSON.parse(localStorage.getItem('plantoes')) || [];
            const updatedPlantoes = plantoes.map(p => 
                p.id === plantao.id ? updatedPlantao : p
            );
            
            localStorage.setItem('plantoes', JSON.stringify(updatedPlantoes));
            setPlantao(updatedPlantao);
            setShowEditTriunvirato(false);
        }
    };

    const renderTriunvirato = (triunvirato) => {
        return (
            <div className={styles.contentCard}>
                <h6>Sajuanos</h6>
                {triunvirato.sajuanos && triunvirato.sajuanos.length > 0 ? (
                    triunvirato.sajuanos.map((sajuanoId, idx) => {
                        const sajuano = availableMembers.sajuanos.find(m => m.id === sajuanoId);
                        return sajuano ? <p key={idx}>{sajuano.name}</p> : <p key={idx}>Sajuano não encontrado</p>;
                    })
                ) : (
                    <p>Nenhum sajuano vinculado</p>
                )}

                <h6 className={styles.monitorTitle}>Monitor</h6>
                {triunvirato.monitores && triunvirato.monitores.length > 0 ? (
                    triunvirato.monitores.map((monitorId, idx) => {
                        const monitor = availableMembers.monitores.find(m => m.id === monitorId);
                        return monitor ? (
                            <div key={idx}>
                                <p>{monitor.name}</p>
                                <p>OAB: {monitor.oab}</p>
                            </div>
                        ) : <p key={idx}>Monitor não encontrado</p>;
                    })
                ) : (
                    <p className={styles.contentMonitor}>Nenhum monitor vinculado</p>
                )}

                {showAssistidos && triunvirato.assistidos && (
                    <>
                        <h6 className={styles.assistidosTitle}>Assistidos</h6>
                        {triunvirato.assistidos.map((assistido, idx) => (
                            <div key={idx}>
                                <p>{assistido.nome}</p>
                                <p><BsArrowReturnRight/> {assistido.processo}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        );
    };

    return(
        <>
            <Header/>
            <main className={styles.containerMain}>
                <h3>Plantão {plantao.id}</h3>
                <article className={styles.infoDutyHeader}>
                    <section className={styles.tags}>
                        {infoDuty.map((info, index) => (
                            <div key={index}>
                                {index === 0 ? <FiTag/> : index === 1 ? <IoIosCalendar/> : <LuClock3/>}
                                <h4>{info}</h4>
                            </div>
                        ))}
                    </section>
                    <h4>Coordenador: João Carlos Mercês Almeida dos Santos</h4>
                </article>
                <h4 className={styles.triunvirateTitle}>Triunviratos</h4>
                <article className={styles.containerCards}>
                    {plantao.triunviratos.map((triunvirato, index) => (
                        <section key={index} className={styles.detailsTriunvirateCard}>
                            <h4 className={styles.tagTs}>{triunvirato.codigo}</h4>
                            {renderTriunvirato(triunvirato)}
                            <div className={styles.areaBtns}>
                                <button 
                                className={styles.btnsCard} 
                                onClick={() => setShowAssistidos(!showAssistidos)}>
                                    {showAssistidos ? <> Ver menos </> : <> Ver assistidos </>}</button>
                                <button 
                                    className={styles.btnsCard}
                                    onClick={() => handleEditTriunvirato(triunvirato)}>
                                    Editar
                                </button>
                            </div>
                        </section>
                    ))}
                </article>
                {showEditDuty && (
                    <article className={styles.containerEditDuty}>
                        <h4>Dados do Plantão</h4>
                        <section className={styles.containerInputs}>
                            <label className={styles.labelInput}>
                                <span>Identificador</span>
                                <input type="text" placeholder="TA"/>
                            </label>
                            <label className={styles.labelInput}>
                                <span>Dia da semana</span>
                                <input type="text" placeholder="Segunda-feira"/>
                            </label>
                            <label className={styles.labelInput}>
                                <span>Horário de entrada</span>
                                <InputMask type placeholder="14:00" mask="99:99"/>
                            </label>
                            <label className={styles.labelInput}>
                                <span>Horário de saída</span>
                                <InputMask type="text" placeholder="17:00" mask="99:99"/>
                            </label>
                            <label className={styles.labelInput}>
                                <span>Coordenador</span>
                                <input type="text" placeholder="João Carlos Mercês Almeida dos Santos" className={styles.inputCoordinator}/>
                            </label>
                        </section>
                    </article>
                )}
                <article className={styles.containerButtons}>
                    <button onClick={() => navigate('/plantao')}>
                        <TiArrowBack/> Voltar
                    </button>
                    <button onClick={() => setShowAddTriunvirato(true)}>
                        <MdAddBox/> Adicionar Triunvirato
                    </button>
                    <button 
                        onClick={() => setShowEditDuty(!showEditDuty)} 
                        className={showEditDuty ? styles.saveDuty : ''}
                    > 
                        {showEditDuty ? (
                            <> <HiMiniDocumentCheck/> Salvar </>
                        ) : (
                            <> <MdModeEditOutline/> Editar </>
                        )} 
                    </button>
                    <button onClick={handleDeleteDuty}>
                        <IoMdTrash/>Excluir
                    </button>
                </article>

                {showAddTriunvirato && (
                    <div className={styles.modalAddTriunvirato}>
                        <h4>Novo Triunvirato</h4>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleAddTriunvirato();
                        }}>
                            <button type="submit">Confirmar</button>
                            <button type="button" onClick={() => setShowAddTriunvirato(false)}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                )}

                {showEditTriunvirato && editingTriunvirato && (
                    <div className={styles.modalEditTriunvirato}>
                        <div className={styles.modalHeader}>
                            <h4>Editar Triunvirato {editingTriunvirato.codigo}</h4>
                            <button 
                                type="button" 
                                className={styles.deleteBtn}
                                onClick={() => handleDeleteTriunvirato(editingTriunvirato.id)}
                            >
                                <AiOutlineDelete /> Excluir Triunvirato
                            </button>
                        </div>
                        <form onSubmit={handleSaveTriunvirato}>
                            <div className={styles.formGroup}>
                                <label>
                                    <span>Sajuanos</span>
                                    <select 
                                        multiple 
                                        name="sajuanos"
                                        className={styles.memberSelect}
                                        defaultValue={editingTriunvirato.sajuanos || []}
                                    >
                                        {availableMembers.sajuanos.map(sajuano => (
                                            <option key={sajuano.id} value={sajuano.id}>
                                                {sajuano.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <small>* Segure CTRL para selecionar múltiplos sajuanos</small>
                            </div>

                            <div className={styles.formGroup}>
                                <label>
                                    <span>Monitor</span>
                                    <select 
                                        name="monitor"
                                        className={styles.memberSelect}
                                        defaultValue={editingTriunvirato.monitores?.[0] || ''}
                                    >
                                        <option value="">Selecione um monitor</option>
                                        {availableMembers.monitores.map(monitor => (
                                            <option key={monitor.id} value={monitor.id}>
                                                {monitor.name} - OAB: {monitor.oab}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className={styles.modalButtons}>
                                <button type="submit" className={styles.saveBtn}>
                                    Salvar Alterações
                                </button>
                                <button 
                                    type="button" 
                                    className={styles.cancelBtn}
                                    onClick={() => setShowEditTriunvirato(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
            <Footer/>
        </>
    );
};

export default Ts;
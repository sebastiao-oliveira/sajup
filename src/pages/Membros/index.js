import { useState, useEffect } from 'react'
import ModalDelete from '../../components/ModalsMember/Delete'
import {AiOutlineSearch} from 'react-icons/ai'
import styles from './Membros.module.scss'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const Membros = () => {
    const [DeleteModal, setDeleteModal] = useState(false)
    const [selectedMember, setSelectedMember] = useState(null)
    const [memberType, setMemberType] = useState('all')
    const [membros, setMembros] = useState([]);

    useEffect(() => {
        const fetchMembros = () => {
            const data = localStorage.getItem('members');
            if (data) {
                setMembros(JSON.parse(data));
            }
        };

        fetchMembros();
    }, []);

    const handleDelete = () => {
        const updatedMembros = membros.filter(membro => membro.id !== selectedMember.id);
        setMembros(updatedMembros);
        localStorage.setItem('members', JSON.stringify(updatedMembros));
        setDeleteModal(false);
        setSelectedMember(null);
    };

    const membrosFiltrados = memberType === 'all' 
        ? membros 
        : membros.filter(membro => membro.memberType === (memberType === 'sajuanos' ? 'sajuano' : 'monitor'))

    return(
        <>
            <Header/>
            <main className={styles.containerBody}>
                <h3>Membros</h3>
                <div className={styles.filterButtons}>
                    <button 
                        className={`${styles.filterBtn} ${memberType === 'sajuanos' ? styles.active : ''}`}
                        onClick={() => setMemberType('sajuanos')}
                    >
                        Sajuanos
                    </button>
                    <button 
                        className={`${styles.filterBtn} ${memberType === 'monitores' ? styles.active : ''}`}
                        onClick={() => setMemberType('monitores')}
                    >
                        Monitores
                    </button>
                </div>
                <div className={styles.containerSearchMember}>
                    <input type='text' placeholder='Pesquisar membro' className={styles.inputSearch}/>
                    <AiOutlineSearch className={styles.searchMember}/>
                </div>
                <article className={styles.contentBody}>
                    <table>
                        <thead>
                        <tr className={styles.mobileTrStyle}>
                                <th className={styles.sajuanos}>
                                    {memberType === 'all' ? 'Todos' : 
                                     memberType === 'sajuanos' ? 'Sajuanos' : 'Monitores'}
                                </th>
                                <th className={styles.center}>Nome</th>
                            <th className={styles.duty}>Plantão</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {membrosFiltrados.map((membro, index) => (
                                <tr key={index} className={styles.mobileTrStyle}>
                            <td></td>
                                    <td className={styles.center}>{membro.name}</td>
                                    <td className={styles.rightDutyTime}>{membro.entryDuty} - {membro.exitDuty}</td>
                            <td className={styles.right}>
                                        <button className={styles.btnTable}>
                                            <Link to={`/Membros/VerMais/${membro.id}`}>Ver mais</Link>
                                        </button>
                                        <button 
                                            className={styles.btnTable} 
                                            onClick={() => {
                                                setSelectedMember(membro);
                                                setDeleteModal(true);
                                            }}
                                        >
                                            Desligar
                                        </button>
                            </td>
                        </tr>
                            ))}
                        </tbody>
                    </table>
                </article>
                <Link to="/membros/novo" className={styles.btnNewMember}>
                    Novo membro
                </Link>
                {DeleteModal && (
                    <ModalDelete 
                        close={() => {
                            setDeleteModal(false);
                            setSelectedMember(null);
                        }}
                        confirm={handleDelete}
                        memberName={selectedMember?.name}
                    />
                )}
            </main>
            <Footer/>
        </>
    )
}

export default Membros
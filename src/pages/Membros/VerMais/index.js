import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import styles from './SeeMore.module.scss'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';

const SeeMoreMember = () => {
    const { id } = useParams();
    const [member, setMember] = useState(null);

    useEffect(() => {
        const loadMemberData = () => {
            try {
                const members = JSON.parse(localStorage.getItem('members')) || [];
                const foundMember = members.find(m => m.id === id);
                if (foundMember) {
                    setMember(foundMember);
                    console.log("Member found:", foundMember); // Debug log
                } else {
                    console.log("Member not found for ID:", id); // Debug log
                }
            } catch (error) {
                console.error("Error loading member data:", error);
            }
        };

        loadMemberData();
    }, [id]);

    if (!member) {
        return (
            <>
                <Header />
                <main className={styles.containerMain}>
                    <h3>Membro não encontrado</h3>
                    <Link to="/membros" className={styles.btnBack}>Voltar</Link>
                </main>
                <Footer />
            </>
        );
    }

    return(
        <>
            <Header/>
            <main className={styles.containerMain}>
                <h3>{member.name}</h3>
                <article className={styles.containerForms}>
                    <section className={styles.sectionForm}>
                        <h4>Dados Pessoais</h4>
                        <div className={styles.formPersonal}>
                            {/* Display member type */}
                            <div className={styles.inputFull}>
                                <span>Tipo de Membro</span>
                                <p>{member.memberType === 'sajuano' ? 'Sajuano' : 'Monitor'}</p>
                            </div>
                            {/* Rest of personal data */}
                            <div className={styles.inputFull}>
                                <span>Nome</span>
                                <p>{member.name}</p>
                            </div>
                            <div className={styles.inputCpf}>
                                <span>CPF</span>
                                <p>{member.cpf}</p>
                            </div>
                            <div className={styles.inputRg}>
                                <span>RG</span>
                                <p>{member.rg}</p>
                            </div>
                            <div className={styles.inputSender}>
                                <span>Emissor</span>
                                <p>{member.sender}</p>
                            </div>
                            <div className={styles.inputBorn}>
                                <span>Data de nascimento</span>
                                <p>{member.born}</p>
                            </div>
                            <div className={styles.inputSkinColor}>
                                <span>Raça/Cor</span>
                                <p>{member.skin}</p>
                            </div>
                            <div className={styles.inputGender}>
                                <span>Gênero</span>
                                <p>{member.gender}</p>
                            </div>
                            <div className={styles.inputOrientationSex}>
                                <span>Orientação Sexual</span>
                                <p>{member.orientationSex}</p>
                            </div>
                            <div className={styles.inputPhone}>
                                <span>Telefone</span>
                                <p>{member.phone}</p>
                            </div>
                            <div className={styles.inputEmail}>
                                <span>Email</span>
                                <p>{member.email}</p>
                            </div>
                            <div className={styles.inputFull}>
                                <span>Instituição de Ensino</span>
                                <p>{member.institution}</p>
                            </div>
                            <div className={styles.inputType}>
                                <span>Tipo</span>
                                <p>{member.type}</p>
                            </div>
                            <div className={styles.inputStatus}>
                                <span>Status</span>
                                <p>{member.status}</p>
                            </div>
                        </div>
                    </section>
                    <section className={styles.sectionForm}>
                        <h4>Endereço</h4>
                        <div className={styles.formAddress}>
                            <div className={styles.inputCep}>
                                <span>CEP</span>
                                <p>{member.cep}</p>
                            </div>
                            <div className={styles.inputStreet}>
                                <span>Rua/Avenida</span>
                                <p>{member.street}</p>
                            </div>
                            <div>
                                <span>Número</span>
                                <p>{member.number}</p>
                            </div>
                            <div className={styles.inputNeighbor}>
                                <span>Bairro</span>
                                <p>{member.neighbor}</p>
                            </div>
                            <div>
                                <span>Complemento</span>
                                <p>{member.complement}</p>
                            </div>
                        </div>
                        <h4>Dados do SAJU</h4>
                        <div className={styles.formDataSaju}>
                            <div className={styles.inputEntryDuty}>
                                <span>Entrada no plantão</span>
                                <p>{member.entryDuty}</p>
                            </div>
                            <div className={styles.inputExitDuty}>
                                <span>Saída do plantão</span>
                                <p>{member.exitDuty}</p>
                            </div>
                            <div className={styles.inputEntryDuty}>
                                <span>Data de entrada no SAJU</span>
                                <p>{member.entrySaju}</p>
                            </div>
                            <div>
                                <span>Triunvirato</span>
                                <p>{member.triunvirate}</p>
                            </div>
                        </div>
                    </section>
                </article>
                <article className={styles.containerComissions}>
                    <h4>Comissões</h4>
                    <section className={styles.containerContents}>
                       <div className={styles.content}>
                            <h5>Comunicação</h5>
                            <p>De: 01/01/2023</p>
                            <p>Até: 01/07/2023</p>
                        </div> 
                       <div className={styles.content}>
                            <h5>Software</h5>
                            <p>De: 01/01/2023</p>
                            <p>Até: o momento</p>
                        </div> 
                    </section>
                    <section className={styles.areaBtn}>
                        <button className={styles.btnEdit}> <Link to={`/membros/editar/${member.id}`}> Editar informações </Link> </button>
                        <button className={styles.btnBack}> <Link to="/membros">Voltar</Link> </button>
                    </section>
                </article>
            </main>
            <Footer/>
        </>
    )
}

export default SeeMoreMember
import { Link, useParams, useNavigate } from "react-router-dom"
import { InputMask } from 'primereact/inputmask';
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import styles from './Edit.module.scss'
import { useEffect, useState } from 'react'

const commissionOptions = [
    'Arquivo',
    'Capacitação',
    'Certificados',
    'Colaboração',
    'Comunicação',
    'Estrutura',
    'Finanças',
    'Formação',
    'Software'
]

const EditMember = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [selectedCommissions, setSelectedCommissions] = useState([]);

    useEffect(() => {
        const loadMemberData = () => {
            const members = JSON.parse(localStorage.getItem('members')) || [];
            const foundMember = members.find(m => m.id === id);
            if (foundMember) {
                setMember(foundMember);
                setSelectedCommissions(foundMember.commissions || []);
            } else {
                alert('Membro não encontrado');
                navigate('/membros');
            }
        };

        loadMemberData();
    }, [id, navigate]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedCommissions(prev => [...prev, value]);
        } else {
            setSelectedCommissions(prev => prev.filter(c => c !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const updatedMember = {
            ...member,
            name: formData.get('name'),
            cpf: formData.get('cpf'),
            rg: formData.get('rg'),
            sender: formData.get('sender'),
            born: formData.get('born'),
            skin: formData.get('skin'),
            gender: formData.get('gender'),
            orientationSex: formData.get('orientationSex'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            institution: formData.get('institution'),
            type: formData.get('type'),
            status: formData.get('status'),
            cep: formData.get('cep'),
            street: formData.get('street'),
            number: formData.get('number'),
            neighbor: formData.get('neighbor'),
            complement: formData.get('complement'),
            entryDuty: formData.get('entryDuty'),
            exitDuty: formData.get('exitDuty'),
            entrySaju: formData.get('entrySaju'),
            triunvirate: formData.get('triunvirate'),
            commissions: selectedCommissions
        };

        try {
            const members = JSON.parse(localStorage.getItem('members')) || [];
            const updatedMembers = members.map(m => 
                m.id === id ? updatedMember : m
            );
            localStorage.setItem('members', JSON.stringify(updatedMembers));
            alert('Informações atualizadas com sucesso!');
            navigate('/membros');
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Erro ao atualizar as informações');
        }
    };

    if (!member) return <p>Carregando...</p>;

    return(
        <>
            <Header/>
            <main className={styles.containerMain}>
                <h3>Editar membro</h3>
                <form onSubmit={handleSubmit}>
                    <article className={styles.containerForms}>
                        <section className={styles.sectionForm}>
                            <h4>Dados pessoais</h4>
                            <div className={styles.formPersonal}>
                                <label className={styles.inputFull}>
                                    <span>Nome</span>
                                    <input type="text" name="name" defaultValue={member.name}/>
                                </label>
                                <label className={styles.inputCpf}>
                                    <span>CPF</span>
                                    <InputMask mask="999.999.999-99" name="cpf" defaultValue={member.cpf}/>
                                </label>
                                <label className={styles.inputRg}>
                                    <span>RG</span>
                                    <InputMask mask="99.999.999-999" name="rg" defaultValue={member.rg}/>
                                </label>
                                <label>
                                    <span>Emissor</span>
                                    <InputMask mask="XXX-XX" name="sender" defaultValue={member.sender}/>
                                </label>
                                <label className={styles.inputBorn}>
                                    <span>Data de nascimento</span>
                                    <InputMask mask="99/99/9999" name="born" defaultValue={member.born}/>
                                </label>
                                <label className={styles.inputSkinColor}>
                                    <span>Raça/Cor</span>
                                    <input type="text" name="skin" defaultValue={member.skin}/>
                                </label>
                                <label className={styles.inputGender}>
                                    <span>Gênero</span>
                                    <input type="text" name="gender" defaultValue={member.gender}/>
                                </label>
                                <label className={styles.inputOrientationSex}>
                                    <span>Orientação Sexual</span>
                                    <input type="text" name="orientationSex" defaultValue={member.orientationSex}/>
                                </label>
                                <label className={styles.inputPhone}>
                                    <span>Telefone</span>
                                    <InputMask mask="(99) 99999-9999" name="phone" defaultValue={member.phone}/>
                                </label>
                                <label className={styles.inputEmail}>
                                    <span>Email</span>
                                    <input type="text" name="email" defaultValue={member.email}/>
                                </label>
                                <label className={styles.inputFull}>
                                    <span>Instituição de Ensino</span>
                                    <input type="text" name="institution" defaultValue={member.institution}/>
                                </label>
                                <label className={styles.inputType}>
                                    <span>Tipo</span>
                                    <input type="text" name="type" defaultValue={member.type}/>
                                </label>
                                <label className={styles.inputStatus}>
                                    <span>Status</span>
                                    <input type="text" name="status" defaultValue={member.status}/>
                                </label>
                            </div>
                        </section>
                        <section className={styles.sectionForm}>
                            <h4>Endereço</h4>
                            <div className={styles.formAddress}>
                                <label className={styles.inputCep}>
                                    <span>CEP</span>
                                    <InputMask mask="99999-999" name="cep" defaultValue={member.cep}/>
                                </label>
                                <label className={styles.inputStreet}>
                                    <span>Rua/Avenida</span>
                                    <input type="text" name="street" defaultValue={member.street}/>
                                </label>
                                <label>
                                    <span>Número</span>
                                    <input type="text" name="number" defaultValue={member.number}/>
                                </label>
                                <label className={styles.inputNeighbor}>
                                    <span>Bairro</span>
                                    <input type="text" name="neighbor" defaultValue={member.neighbor}/>
                                </label>
                                <label>
                                    <span>Complemento</span>
                                    <input type="text" name="complement" defaultValue={member.complement}/>
                                </label>
                            </div>
                            <h4>Dados do SAJU</h4>
                            <div className={styles.formDataSaju}>
                                <label className={styles.inputEntryDuty}>
                                    <span>Entrada no plantão</span>
                                    <InputMask mask="99:99" name="entryDuty" defaultValue={member.entryDuty}/>
                                </label>
                                <label className={styles.inputExitDuty}>
                                    <span>Saída do plantão</span>
                                    <InputMask mask="99:99" name="exitDuty" defaultValue={member.exitDuty}/>
                                </label>
                                <label className={styles.inputEntryDuty}>
                                    <span>Data de entrada no SAJU</span>
                                    <InputMask mask="99/99/9999" name="entrySaju" defaultValue={member.entrySaju}/>
                                </label>
                                <label>
                                    <span>Triunvirato</span>
                                    <input type="text" name="triunvirate" defaultValue={member.triunvirate}/>
                                </label>
                            </div>
                        </section>
                    </article>
                    <section className={styles.commissions}>
                        <h4>Comissões</h4>
                        <p>Se for o caso, selecione para inserir o membro em uma ou mais comissões</p>
                        <section className={styles.containerCheckbox}>
                            {commissionOptions.map(option => (
                                <label key={option}>
                                    <input 
                                        type="checkbox" 
                                        value={option} 
                                        checked={selectedCommissions.includes(option)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className={styles.checkmark}></span>
                                    <span className={styles.textCheckbox}>{option}</span>
                                </label>
                            ))}
                        </section>
                    </section>
                    <section className={styles.areaBtn}>
                        <button type="submit" className={styles.btnConfirm}>
                            Confirmar
                        </button>
                        <button type="button" onClick={() => navigate('/membros')} className={styles.btnCancel}>
                            Cancelar
                        </button>
                    </section>
                </form>
            </main>
            <Footer/>
        </>
    )
}

export default EditMember
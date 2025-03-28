import { useNavigate } from 'react-router-dom'
import {BsPaperclip} from 'react-icons/bs'
import { InputMask } from 'primereact/inputmask';
import styles from './Register.module.scss'
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import { useState, useEffect } from 'react'

const RegisterMember = () => {
    const navigate = useNavigate()
    const [memberType, setMemberType] = useState('')
    const [members, setMembers] = useState([])
    const [showOab, setShowOab] = useState(false);
    const [oabData, setOabData] = useState({
        number: '',
        state: 'BA' // Estado padrão
    });

    useEffect(() => {
      const storedMembers = JSON.parse(localStorage.getItem('members')) || []
      setMembers(storedMembers)
    }, [])

    useEffect(() => {
        setShowOab(memberType === 'monitor');
    }, [memberType]);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!memberType) {
            alert('Por favor, selecione o tipo de membro (Sajuano ou Monitor)')
            return
        }

        const formData = new FormData(e.target)
        const cpf = formData.get('cpf')
        
        if (!cpf) {
            alert('Por favor, preencha o CPF do membro')
            return
        }

        if (memberType === 'monitor') {
            if (!oabData.number || !oabData.state) {
                alert('Por favor, preencha o número e estado da OAB')
                return
            }
        }

        const newMember = {
            id: formData.get('cpf'),
            memberType,
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
            oab: memberType === 'monitor' ? `${oabData.number}/${oabData.state}` : null,
            cep: formData.get('cep'),
            street: formData.get('street'),
            number: formData.get('number'),
            neighbor: formData.get('neighbor'),
            complement: formData.get('complement'),
            entryDuty: formData.get('entryDuty'),
            exitDuty: formData.get('exitDuty'),
            entrySaju: formData.get('entrySaju'),
            triunvirate: formData.get('triunvirate'),
        }

        try {
            const storedMembers = JSON.parse(localStorage.getItem('members')) || []
            const updatedMembers = [...storedMembers, newMember]
            localStorage.setItem('members', JSON.stringify(updatedMembers))
            alert('Membro registrado com sucesso!')
            navigate('/membros')
        } catch (error) {
            console.error('Erro ao salvar:', error)
            alert('Erro ao salvar o membro')
        }
    }

    return(
        <>
            <Header/>
            <main className={styles.containerMain}>
                <h3>Novo membro</h3>
                <form onSubmit={handleSubmit}>
                    <article className={styles.containerForms}>
                        <section className={styles.sectionForm}>
                            <h4>Dados Pessoais</h4>
                            <div className={styles.formPersonal}>
                                <div className={styles.memberTypeSelector}>
                                    <label>Tipo de Membro:</label>
                                    <div className={styles.memberTypeButtons}>
                                        <button 
                                            type="button"
                                            className={`${styles.typeBtn} ${memberType === 'sajuano' ? styles.active : ''}`}
                                            onClick={() => setMemberType('sajuano')}
                                        >
                                            Sajuano
                                        </button>
                                        <button 
                                            type="button"
                                            className={`${styles.typeBtn} ${memberType === 'monitor' ? styles.active : ''}`}
                                            onClick={() => setMemberType('monitor')}
                                        >
                                            Monitor
                                        </button>
                                    </div>
                                </div>
                                <input className={styles.inputFull} type='text' name='name' placeholder='Nome'/>
                                <InputMask 
                                    mask='999.999.999-99' 
                                    className={styles.inputCPF} 
                                    name='cpf' 
                                    placeholder='CPF *' 
                                    required
                                />
                                <InputMask mask='99999999 99' className={styles.inputRG} name='rg' placeholder='RG'/>
                                <InputMask mask='XXX-XX' className={styles.inputSender} name='sender' placeholder='Emissor'/>
                                <InputMask mask='99/99/9999' className={styles.inputBorn} name='born' placeholder='Data de nascimento'/>
                                <input className={styles.inputSkin} type='text' name='skin' placeholder='Raça/Cor'/>
                                <input className={styles.inputGender} type='text' name='gender' placeholder='Gênero'/>
                                <input className={styles.inputOrientationSex} type='text' name='orientationSex' placeholder='Orientação Sexual'/>
                                <InputMask mask='(99) 99999-9999' className={styles.inputPhone} name='phone' placeholder='Telefone'/>
                                <input className={styles.inputEmail} type='text' name='email' placeholder='Email'/>
                                <input className={styles.inputFull} type='text' name='institution' placeholder='Instituição de Ensino'/>
                                <input className={styles.inputType} type='text' name='type' placeholder='Tipo'/>
                                <input className={styles.inputStatus} type='text' name='status' placeholder='Status'/>
                                {showOab && (
                                    <div className={styles.oabContainer}>
                                        <label className={styles.inputOabNumber}>
                                            <span>Número OAB *</span>
                                            <input 
                                                type="number" 
                                                value={oabData.number}
                                                onChange={(e) => setOabData({...oabData, number: e.target.value})}
                                                placeholder="Número"
                                                required
                                            />
                                        </label>
                                        <label className={styles.inputOabState}>
                                            <span>Estado OAB *</span>
                                            <select 
                                                value={oabData.state}
                                                onChange={(e) => setOabData({...oabData, state: e.target.value})}
                                                required
                                            >
                                                <option value="AC">AC</option>
                                                <option value="AL">AL</option>
                                                <option value="AM">AM</option>
                                                <option value="AP">AP</option>
                                                <option value="BA">BA</option>
                                                <option value="CE">CE</option>
                                                <option value="DF">DF</option>
                                                <option value="ES">ES</option>
                                                <option value="GO">GO</option>
                                                <option value="MA">MA</option>
                                                <option value="MG">MG</option>
                                                <option value="MS">MS</option>
                                                <option value="MT">MT</option>
                                                <option value="PA">PA</option>
                                                <option value="PB">PB</option>
                                                <option value="PE">PE</option>
                                                <option value="PI">PI</option>
                                                <option value="PR">PR</option>
                                                <option value="RJ">RJ</option>
                                                <option value="RN">RN</option>
                                                <option value="RO">RO</option>
                                                <option value="RR">RR</option>
                                                <option value="RS">RS</option>
                                                <option value="SC">SC</option>
                                                <option value="SE">SE</option>
                                                <option value="SP">SP</option>
                                                <option value="TO">TO</option>
                                            </select>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </section>
                        <section className={styles.sectionForm}>
                            <h4>Endereço</h4>
                            <div className={styles.formAddress}>
                                <InputMask mask='99999-999' className={styles.inputCEP} name='cep' placeholder='CEP'/>
                                <input className={styles.inputStreet} type='text' name='street' placeholder='Rua/Avenida'/>
                                <input className={styles.inputNumber} type='text' name='number' placeholder='Número'/>
                                <input className={styles.inputNeighbor} type='text' name='neighbor' placeholder='Bairro'/>
                                <input className={styles.inputComplement} type='text' name='complement' placeholder='Complemento'/>
                            </div>
                            <h4>Dados do SAJU</h4>
                            <div className={styles.formDataSaju}>
                                <InputMask mask='99:99' className={styles.inputEntryDuty} name='entryDuty' placeholder='Entrada no plantão'/>
                                <InputMask mask="99:99" className={styles.inputExitDuty} name='exitDuty' placeholder='Saída do plantão'/>
                                <InputMask mask='99/99/9999' className={styles.inputEntrySaju} name='entrySaju' placeholder='Data de entrada no SAJU'/>
                                <input className={styles.inputTriunvirate} type='text' name='triunvirate' placeholder='Triunvirato'/>
                            </div>
                            <p>Termo de Adesão <BsPaperclip/> </p>
                        </section>
                    </article>
                    <article className={styles.commissions}>
                        <h4>Comissões</h4>
                        <p>Se for o caso, selecione para inserir o membro em uma ou mais comissões</p>
                        <section className={styles.containerCheckbox}>
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Arquivo</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Capacitação</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Certificados</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Colaboração</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Comunicação</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Estrutura</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Finanças</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Formação</span>
                            </label>
                            
                            <label>
                                <input type='checkbox'/> 
                                <span className={styles.checkmark}></span>
                                <span className={styles.textCheckbox}>Software</span>
                            </label>
                        </section>
                        <section className={styles.areaBtn}>
                            <button type="submit" className={styles.btnConfirm}>
                                Confirmar
                            </button>
                            <button type="button" onClick={() => navigate('/membros')}>
                                Cancelar
                            </button>
                        </section>
                    </article>
                </form>
            </main>
            <Footer/>
        </>
    )
}

export default RegisterMember
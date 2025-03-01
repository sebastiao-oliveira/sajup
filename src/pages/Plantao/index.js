import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { InputMask } from 'primereact/inputmask';
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from './Plantao.module.scss'

const Plantao = () => {
    const [paramsLink, setParamsLink] = useState([])
    const [addDuty, setAddDuty] = useState(false)
    const navigate = useNavigate()

    const handleClick = (e) => {
        
        // pegar elementos para passar como parametros
        const cardElement = e.currentTarget.querySelector(`.${styles.card}`);
        
        const tsDuty = cardElement.querySelector('h4').innerHTML; 
        const hourDuty = cardElement.querySelector('p').innerHTML;
        const dayDuty = e.currentTarget.firstElementChild.innerHTML

        const paramsToPass = [tsDuty, dayDuty, hourDuty]

        setParamsLink(paramsToPass)
    }

    useEffect(()=> {
        if(paramsLink) navigate(`/plantao/${paramsLink}`)
    },[paramsLink, navigate])

    return(
        <>
            <Header/>
                <main className={styles.containerMain}>
                    <section className={styles.containerHeader}>
                        <h3>Plantão</h3>
                        <button onClick={() => setAddDuty(!addDuty)}>Novo plantão</button>
                    </section>
                    {addDuty && (
                        <article className={styles.addDuty}>
                            <h4>Dados do Plantão</h4>
                            <section className={styles.areaForm}>
                                <input type="text" placeholder="Identificador"/>
                                <input type="text" placeholder="Dia da semana"/>
                                <InputMask mask="99:99" placeholder="Horário de entrada"/>
                                <InputMask mask="99:99" placeholder="Horário de saída"/>
                                <input type="text" placeholder="Coordenador" className={styles.coordinator}/>
                            </section>
                            <section className={styles.areaBtn}>
                                <button onClick={() => setAddDuty(!addDuty)}>Confirmar</button>
                                <button onClick={() => setAddDuty(!addDuty)}>Cancelar</button>
                            </section>
                        </article>
                    )}
                    <article className={styles.containerCards}>
                        <section className={styles.containerCard} onClick={(e) => handleClick(e)}>
                            <h4 className={styles.day}>Segunda-feira</h4>
                            <div className={styles.card}>
                                <h4>TA</h4>
                                <a>Ver mais detalhes</a>
                                <p>14:00-17:00</p>
                            </div>
                        </section>
                        <section className={styles.containerCard} onClick={(e) => handleClick(e)}>
                            <h4 className={styles.day}>Terça-feira</h4>
                            <div className={styles.card}>
                                <h4>TB</h4>
                                <a>Ver mais detalhes</a>
                                <p>14:00-17:00</p>
                            </div>
                        </section>
                        <section className={styles.containerCard} onClick={(e) => handleClick(e)}>
                            <h4 className={styles.day}>Terça-feira</h4>
                            <div className={styles.card}>
                                <h4>TC</h4>
                                <a>Ver mais detalhes</a>
                                <p>18:30-20:30</p>
                            </div>
                        </section>
                        <section className={styles.containerCard} onClick={(e) => handleClick(e)}>
                            <h4 className={styles.day}>Quarta-feira</h4>
                            <div className={styles.card}>
                                <h4>TD</h4>
                                <a>Ver mais detalhes</a>
                                <p>14:00-17:00</p>
                            </div>
                        </section>
                        <section className={styles.containerCard} onClick={(e) => handleClick(e)}>
                            <h4 className={styles.day}>Quarta-feira</h4>
                            <div className={styles.card}>
                                <h4>TE</h4>
                                <a>Ver mais detalhes</a>
                                <p>18:30-20:30</p>
                            </div>
                        </section>
                        <section className={styles.containerCard} onClick={(e) => handleClick(e)}>
                            <h4 className={styles.day}>Quinta-feira</h4>
                            <div className={styles.card}>
                                <h4>TF</h4>
                                <a>Ver mais detalhes</a>
                                <p>18:30-20:30</p>
                            </div>
                        </section>
                        <section className={styles.containerCard} onClick={(e) => handleClick(e)}>
                            <h4 className={styles.day}>Sexta-feira</h4>
                            <div className={styles.card}>
                                <h4>TG</h4>
                                <a>Ver mais detalhes</a>
                                <p>14:00-17:00</p>
                            </div>
                        </section>
                    </article>
                </main>
            <Footer/>
        </>
    )
}

export default Plantao
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { InputMask } from 'primereact/inputmask';
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from './Plantao.module.scss'

const Plantao = () => {
    const [paramsLink, setParamsLink] = useState([])
    const [addDuty, setAddDuty] = useState(false)
    const [plantoes, setPlantoes] = useState([]); // State to store all plantoes
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

    const handleAddDuty = (e) => {
        e.preventDefault();
        const form = e.target;
        const newDuty = {
            id: form.elements['identificador'].value,
            diaSemana: form.elements['diaSemana'].value,
            horario: `${form.elements['entrada'].value}-${form.elements['saida'].value}`,
            coordenador: form.elements['coordenador'].value,
            triunviratos: []
        };

        const updatedPlantoes = [...plantoes, newDuty];
        localStorage.setItem('plantoes', JSON.stringify(updatedPlantoes));
        setPlantoes(updatedPlantoes); // Update state to re-render the list
        setAddDuty(false);
    };

    useEffect(() => {
        const savedPlantoes = JSON.parse(localStorage.getItem('plantoes')) || [];
        setPlantoes(savedPlantoes);
    }, []);

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
                            <form className={styles.areaForm} onSubmit={handleAddDuty}>
                                <input type="text" name="identificador" placeholder="Identificador" required />
                                <input type="text" name="diaSemana" placeholder="Dia da semana" required />
                                <InputMask mask="99:99" name="entrada" placeholder="Horário de entrada" required />
                                <InputMask mask="99:99" name="saida" placeholder="Horário de saída" required />
                                <input type="text" name="coordenador" placeholder="Coordenador" className={styles.coordinator} required />
                                <section className={styles.areaBtn}>
                                    <button type="submit">Confirmar</button>
                                    <button type="button" onClick={() => setAddDuty(false)}>Cancelar</button>
                                </section>
                            </form>
                        </article>
                    )}
                    <article className={styles.containerCards}>
                        {plantoes.map((plantao, index) => (
                            <section 
                                key={index} 
                                className={styles.containerCard} 
                                onClick={(e) => handleClick(e)}
                            >
                                <h4 className={styles.day}>{plantao.diaSemana}</h4>
                                <div className={styles.card}>
                                    <h4>{plantao.id}</h4>
                                    <a>Ver mais detalhes</a>
                                    <p>{plantao.horario}</p>
                                </div>
                            </section>
                        ))}
                    </article>
                </main>
            <Footer/>
        </>
    )
}

export default Plantao
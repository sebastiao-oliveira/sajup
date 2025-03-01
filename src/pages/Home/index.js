import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from './Home.module.scss'
import {FaUser} from 'react-icons/fa'
import {PiFileTextFill} from 'react-icons/pi'
import {AiFillSchedule} from 'react-icons/ai'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const Home = () => {
    const [date, setDate] = useState()
    
    const getDate = () => {
        const fullDate = new Date()
        
        const getDayOfWeek = (dayNumber) => {
            const daysOfWeek = [
            'Domingo', 'Segunda-feira', 'Terça-feira', 
            'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 
            'Sábado']
            return daysOfWeek[dayNumber]
        }
    
        const getMonthName = (monthNumber) => {
            const months = [
            'Janeiro', 'Fevereiro', 'Março', 
            'Abril', 'Maio', 'Junho', 'Julho', 
            'Agosto', 'Setembro', 'Outubro', 
            'Novembro', 'Dezembro'];
            return months[monthNumber]
        }
    
        
        const dayOfMonth = fullDate.getDate()
        const dayWeek = getDayOfWeek(fullDate.getDay())
        const month = getMonthName(fullDate.getMonth())
        const year = fullDate.getFullYear()

        setDate(`${dayWeek}, ${dayOfMonth} de ${month} de ${year}`)
    }

    useEffect(()=>{
        getDate()
    }, [])


    return(
    <>
        <Header/>
            <main className={styles.containerBody}>
                <h2>Bem-vindo, XXX</h2>
                <article className={styles.articleContainer}>

                <section className={styles.content1}>
                    <h4>Assistidos</h4>
                    <FaUser/>
                    <div className={styles.nameDate}>
                        <span>Nome</span>
                        <span>Data de cadastro</span>
                    </div>
                    <ul>
                        <li><p>Teste da Silva Sauro</p> <p>15/02/2023</p></li>
                        <li><p>Teste da Silva Sauro</p> <p>14/02/2023</p></li>
                        <li><p>Teste da Silva Sauro</p> <p>13/02/2023</p></li>
                        <li><p>Teste da Silva Sauro</p> <p>12/02/2023</p></li>
                        <li><p>Teste da Silva Sauro</p> <p>11/02/2023</p></li>
                    </ul>
                    <div className={styles.buttons}>
                        <button>Cadastrar novo assistido</button>
                        <button>Ver todos assistidos</button>
                    </div>
                </section>

                <section className={styles.content2}>
                    <h4>Processos em andamento</h4>
                    <PiFileTextFill/>
                    <div className={styles.infoContent2}>
                        <p>Nome do processo - Nº do processo</p>
                        <a>Ver detalhes</a>
                        <p>Nome do processo - Nº do processo</p>
                        <a>Ver detalhes</a>
                        <p>Nome do processo - Nº do processo</p>
                        <a>Ver detalhes</a>
                    </div>
                    <button>Ver todos os processos</button>
                </section>

                <section className={styles.content3}>
                    <h4>Ficha de presença</h4>
                    <AiFillSchedule/>
                    <span>{date}</span>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="Horário de entrada"/>
                        <input type="text" placeholder="Horário de saída"/>
                    </div>
                    <div className={styles.buttons}>
                        <button>Salvar</button>
                        <button>Ver horários</button>
                    </div>
                </section>
                </article>

                <article>
                    <h3>Novidades</h3>
                </article>
            </main>
        <Footer/>
    </>
    )
}
export default Home
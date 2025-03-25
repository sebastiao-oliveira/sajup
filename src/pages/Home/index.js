import React, { useState, useEffect } from "react";
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from './Home.module.scss'
import {FaUser} from 'react-icons/fa'
import {PiFileTextFill} from 'react-icons/pi'
import {AiFillSchedule} from 'react-icons/ai'
import {  useNavigate } from "react-router-dom"

const Home = () => {
    const [date, setDate] = useState();
    const [assistidos, setAssistidos] = useState([]);
    const [processos, setProcessos] = useState([]);
    const [entryTime, setEntryTime] = useState('');
    const [exitTime, setExitTime] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch assistidos from localStorage
        const storedAssistidos = JSON.parse(localStorage.getItem('assistidos')) || []
        // Sort by date in descending order and get last 5
        const recentAssistidos = storedAssistidos
            .sort((a, b) => new Date(b.dataEntrada) - new Date(a.dataEntrada))
            .slice(0, 5)
        setAssistidos(recentAssistidos)

        // Fetch processos from localStorage
        const storedProcessos = JSON.parse(localStorage.getItem('processos')) || []
        const recentProcessos = storedProcessos
            .filter(p => p.status === 'Em andamento')
            .slice(0, 3)
        setProcessos(recentProcessos)
    }, [])

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

    const handleNavigateToAssistidos = () => {
        navigate('/assistidos')
    }

    const handleNavigateToProcessos = () => {
        navigate('/processos');
    };

    const handleSavePresence = () => {
        if (!entryTime || !exitTime) {
            alert('Por favor, preencha os horários de entrada e saída.');
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const presenceData = {
            name: 'Usuário', // Replace with the logged-in user's name if available
            date: currentDate,
            entryTime: `${currentDate}T${entryTime}`,
            exitTime: `${currentDate}T${exitTime}`,
        };

        const storedPresence = JSON.parse(localStorage.getItem('presence')) || [];
        storedPresence.push(presenceData);
        localStorage.setItem('presence', JSON.stringify(storedPresence));

        alert('Presença registrada com sucesso!');
        setEntryTime('');
        setExitTime('');
    };

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
                        {assistidos.map(assistido => (
                            <li key={assistido.id}>
                                <p>{assistido.nome}</p>
                                <p>{new Date(assistido.dataEntrada).toLocaleDateString('pt-BR')}</p>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.buttons}>
                        <button onClick={handleNavigateToAssistidos}>Cadastrar novo assistido</button>
                        <button onClick={handleNavigateToAssistidos}>Ver todos assistidos</button>
                    </div>
                </section>

                <section className={styles.content2}>
                    <h4>Processos em andamento</h4>
                    <PiFileTextFill/>
                    <div className={styles.infoContent2}>
                        {processos.map(processo => (
                            <React.Fragment key={processo.id}>
                                <p>{processo.nome} - {processo.numero}</p>
                                <a onClick={handleNavigateToProcessos} style={{cursor: 'pointer'}}>Ver detalhes</a>
                            </React.Fragment>
                        ))}
                        {processos.length === 0 && <p>Nenhum processo em andamento</p>}
                    </div>
                    <button onClick={handleNavigateToProcessos}>Ver todos os processos</button>
                </section>

                <section className={styles.content3}>
                    <h4>Ficha de presença</h4>
                    <AiFillSchedule/>
                    <span>{date}</span>
                    <div className={styles.inputs}>
                        <input
                            type="time"
                            placeholder="Horário de entrada"
                            value={entryTime}
                            onChange={(e) => setEntryTime(e.target.value)}
                        />
                        <input
                            type="time"
                            placeholder="Horário de saída"
                            value={exitTime}
                            onChange={(e) => setExitTime(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={handleSavePresence}>Salvar</button>
                        <button onClick={() => navigate('/ficha-presenca')}>Ver horários</button>
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
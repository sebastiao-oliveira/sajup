import { useState } from 'react'
import ModalRecover from '../../components/ModalRecover'
import Footer from "../../components/Footer"
import styles from './Recover.module.scss'
import logoBranco from '../../assets/logo saju branca 2.svg'
import logoVermelho from '../../assets/logo saju vermelha 1.png'
import escritorioImg from '../../assets/escritorio.jpeg'

const RecoverPassword = () => {
    const [emailRegistered, setEmailRegistered] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setShowModal(!showModal)
    }

    const changeColorInput = () => {
        const style = {
            borderColor: 'red'
        }
        if(!emailRegistered) return style
    }

    return(
        <>
        <header className={styles.headerLogin}>
            <img src={logoBranco} alt='logo-img-small'/>
        </header>
        <main className={styles.containerLogin}>
            <section className={styles.formContainer}>
                <h4>Recuperar Conta</h4>
                <img src={logoVermelho} alt='logo-img-large'/>
                <form>
                    <input placeholder='Digite o email cadastrado' type='text' style={changeColorInput()}/>
                    {!emailRegistered &&(<span>E-mail não cadastrado</span>)}
                    <button onClick={(e) => handleClick(e)}>Recuperar senha</button>
                </form>
            </section>
            <img src={escritorioImg} alt='img-login'/>
        </main>
        {showModal && (<ModalRecover close={()=> setShowModal(!showModal)}/>)}
        <Footer/>
    </>  
    )
}
export default RecoverPassword
import { useState } from 'react'
import { InputMask } from 'primereact/inputmask';
import styles from './Login.module.scss'
import Footer from '../../components/Footer'
import logoVermelho from '../../assets/logo saju vermelha 1.png'
import logoBranco from '../../assets/logo saju branca 2.svg'
import { Link } from 'react-router-dom'
import escritorioImg from '../../assets/escritorio.jpeg'

const Login = () => {
    const [infoLogin, setInfoLogin] = useState(true)
    const changeColorInput = () => {
        const style = {
            borderColor: 'red'
        }
        if(!infoLogin) return style
    }
    return(
        <>
            <header className={styles.headerLogin}>
                <img src={logoBranco} alt='logo-img-small'/>
            </header>
            <main className={styles.containerLogin}>
                <div className={styles.formContainer}>
                <h4>Acesse sua conta</h4>
                    <img src={logoVermelho} alt='logo-img-large'/>
                    <form>
                        <InputMask mask='999.999.999-99' placeholder='Digite seu CPF (apenas números)' type='text'/>
                        <input placeholder='Digite sua senha' type='password' style={changeColorInput()}/>
                        {!infoLogin && (<span>Senha incorreta</span>)}
                        <Link to="/membros"><button>Entrar</button></Link>
                        <Link to="/recuperar-senha">Esqueci minha senha</Link>
                    </form>
                </div>
                <img src={escritorioImg} alt='img-login'/>
            </main>
            <Footer/>
        </>
    )
}
export default Login
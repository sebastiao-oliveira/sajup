import { useState } from 'react'
import { InputMask } from 'primereact/inputmask';
import styles from './Login.module.scss'
import Footer from '../../components/Footer'
import logoVermelho from '../../assets/logo saju vermelha 1.png'
import logoBranco from '../../assets/logo saju branca 2.svg'
import { Link, useNavigate } from 'react-router-dom'
import escritorioImg from '../../assets/escritorio.jpeg'
import AuthService from '../../services/auth';

const Login = () => {
    const [infoLogin, setInfoLogin] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const changeColorInput = () => {
        const style = {
            borderColor: 'red'
        }
        if(!infoLogin) return style
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simular autenticação - substitua por sua lógica real de autenticação
        const userData = {
            email,
            nome: 'Usuário Teste' // Adicione outros dados do usuário conforme necessário
        };
        
        AuthService.login(userData);
        navigate('/home');
    };

    return(
        <>
            <header className={styles.headerLogin}>
                <img src={logoBranco} alt='logo-img-small'/>
            </header>
            <main className={styles.containerLogin}>
                <div className={styles.formContainer}>
                <h4>Acesse sua conta</h4>
                    <img src={logoVermelho} alt='logo-img-large'/>
                    <form onSubmit={handleSubmit}>
                        <InputMask mask='999.999.999-99' placeholder='Digite seu CPF (apenas números)' type='text'/>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            
                        />
                       
                        {!infoLogin && (<span>Senha incorreta</span>)}
                        <button type="submit">Entrar</button>
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
import styles from './Modal.module.scss'
import logo from '../../assets/logo saju vermelha 1.png'
import { Link } from 'react-router-dom'

const ModalRecover = () => {
    return(
        <main className={styles.containerMain}>
            <section className={styles.containerContent}>
                <img src={logo} alt='logo-red'/>
                <h4>Você receberá um e-mail com sua senha de acesso.</h4>
                <button> <Link to="/"> Tentar fazer login novamente </Link> </button>
            </section>
        </main>
    )
}
export default ModalRecover
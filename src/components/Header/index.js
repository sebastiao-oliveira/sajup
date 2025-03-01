import styles from './Header.module.scss';
import logo from '../../assets/logo saju branca 2.svg';
import { Link } from 'react-router-dom';
import { TfiMenu } from 'react-icons/tfi';

const Header = () => {
    return(
        <header className={styles.headerContainer}>
            <Link to="/"><img src={logo} alt='logo-white'/></Link>
            <nav className={styles.navLinks}>
                <Link to="/membros">Membros</Link>
                <Link to="/plantao">Plantão</Link>
                <Link to="/comissao">Comissão</Link>
                <Link to="/ficha-presenca">Ficha de Presença</Link>
                <Link to="/triunvirato">Triunvirato</Link>
                <Link to="/assistidos">Assistido</Link>
                <Link to="/najup">NAJUP</Link>
                <Link to="/relatorios">Relatórios</Link>
            </nav>
            <TfiMenu/>
        </header>
    );
}

export default Header;

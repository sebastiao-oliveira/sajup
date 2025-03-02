import { useState } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/logo saju branca 2.svg';
import { Link } from 'react-router-dom';
import { TfiMenu } from 'react-icons/tfi';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return(
        <header className={styles.headerContainer}>
            <Link to="/"><img src={logo} alt='logo-white'/></Link>
            <nav className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                <Link to="/membros">Membros</Link>
                <Link to="/plantao">Plantão</Link>
                <Link to="/comissao">Comissão</Link>
                <Link to="/ficha-presenca">Ficha de Presença</Link>
                <Link to="/triunvirato">Triunvirato</Link>
                <Link to="/assistidos">Assistido</Link>
                <Link to="/najup">NAJUP</Link>
                <Link to="/relatorios">Relatórios</Link>
            </nav>
            <TfiMenu onClick={() => setIsMenuOpen(!isMenuOpen)}/>
        </header>
    )
}

export default Header;

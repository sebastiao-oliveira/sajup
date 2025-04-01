import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo saju branca 2.svg';
import { Link } from 'react-router-dom';
import { TfiMenu } from 'react-icons/tfi';
import AuthService from '../../services/auth';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };
  
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return(
        <header className={styles.headerContainer}>
            <Link to="/home">
                <img src={logo} alt='logo-white'/>
            </Link>
            <nav className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                <Link onClick={handleCloseMenu} to="/membros">Membros</Link>
                <Link onClick={handleCloseMenu} to="/plantao">Plantão</Link>
                <Link onClick={handleCloseMenu} to="/comissao">Comissão</Link>
                <Link onClick={handleCloseMenu} to="/processos">Processos</Link>
                <Link onClick={handleCloseMenu} to="/ficha-presenca">Ficha de Presença</Link>
                <Link onClick={handleCloseMenu} to="/triunvirato">Triunvirato</Link>
                <Link onClick={handleCloseMenu} to="/assistidos">Assistidos</Link>
                <Link onClick={handleCloseMenu} to="/najup">NAJUP</Link>
                <Link onClick={handleCloseMenu} to="/relatorios">Relatórios</Link>
                <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
            </nav>
            <button 
                className={styles.menuButton} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
            >
                <TfiMenu />
            </button>
        </header>
    );
};

export default Header;

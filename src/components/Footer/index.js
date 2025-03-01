import styles from './Footer.module.scss'
import {FaPhone, FaBloggerB, FaFacebook} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import {RiMapPin2Fill, RiInstagramFill} from 'react-icons/ri'
import logo from '../../assets/logo saju branca 2.svg'

const Footer = () => {
    return(
        <footer className={styles.footerContainer}>
            <div className={styles.contentFooter}>
                <div className={styles.copy}>
                    <img src={logo} alt='logo-footer'/>
                    <p>Copyright &reg; - Todos os direitos reservados ao SAJU.</p>
                </div>
                <nav className={styles.socials}>
                    <FaBloggerB/>
                    <FaFacebook/>
                    <a href='https://www.instagram.com/sajubahia/' target='_blank' rel='noreferrer'><RiInstagramFill/></a>
                </nav>
                <div className={styles.contacts}>
                    <div>
                        <FaPhone/> 
                        <span>(71) 3283-9050 </span>
                    </div>

                    <div>
                        <MdEmail/> 
                        <span>sajubahia@gmail.com</span>
                    </div>

                    <div id={styles.divLocation}>
                        <RiMapPin2Fill/> 
                        <span>R. da Paz, s/n, Térreo da Faculdade de Direito da UFBA, Graça Salvador, Bahia, Brasil. </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
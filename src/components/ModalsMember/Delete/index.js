import styles from './Delete.module.scss'
import {MdOutlineClose} from 'react-icons/md'

const ModalDelete = ({ close, confirm, memberName }) => {
    return(
        <main className={styles.containerBack}>
            <section className={styles.containerInside}>
                <MdOutlineClose onClick={close} className={styles.svgClose}/>
                <div className={styles.content}>
                    <h3>Deseja realmente desligar o membro</h3>
                    <p>{memberName}</p>
                    <div className={styles.buttonContainer}>
                        <button className={styles.btnConfirm} onClick={confirm}>Confirmar</button>
                        <button className={styles.btnCancel} onClick={close}>Cancelar</button>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default ModalDelete;
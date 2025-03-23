import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './FichaPresenca.module.scss';

const FichaPresenca = () => {
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [presenceHistory, setPresenceHistory] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
        setMembers(storedMembers);

        const storedPresence = JSON.parse(localStorage.getItem('presence')) || [];
        setPresenceHistory(storedPresence);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectMember = (member) => {
        setSelectedMember(member);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedMember) {
            alert('Por favor, selecione um membro.');
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

        const presenceData = {
            memberId: selectedMember.id,
            name: selectedMember.name,
            entryTime: `${currentDate}T${e.target.entryTime.value}`, // Combine current date with entry time
            exitTime: `${currentDate}T${e.target.exitTime.value}`, // Combine current date with exit time
        };

        const storedPresence = [...presenceHistory, presenceData];
        localStorage.setItem('presence', JSON.stringify(storedPresence));
        setPresenceHistory(storedPresence);

        alert('Presença registrada com sucesso!');
        setSelectedMember(null);
        e.target.reset();
    };

    const handleDateFilterChange = (e) => {
        setFilterDate(e.target.value);
    };

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPresenceHistory = presenceHistory.filter((presence) => {
        if (!filterDate) return true;
        try {
            const presenceDate = new Date(`1970-01-01T${presence.entryTime}`).toISOString().split('T')[0];
            return presenceDate === filterDate;
        } catch (error) {
            console.error('Invalid time value in presence history:', presence.entryTime);
            return false;
        }
    });

    return (
        <>
            <Header />
            <main className={styles.containerMain}>
                <h3>Ficha de Presença</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Pesquisar membro"
                        value={searchTerm}
                        onChange={handleSearch}
                        className={styles.searchInput}
                    />
                    <ul className={styles.memberList}>
                        {filteredMembers.map((member) => (
                            <li
                                key={member.id}
                                onClick={() => handleSelectMember(member)}
                                className={`${styles.memberItem} ${
                                    selectedMember?.id === member.id ? styles.selected : ''
                                }`}
                            >
                                {member.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome Selecionado:
                        <input
                            type="text"
                            value={selectedMember?.name || ''}
                            readOnly
                            className={styles.readOnlyInput}
                        />
                    </label>
                    <label>
                        Horário de Entrada:
                        <input type="time" name="entryTime" required />
                    </label>
                    <label>
                        Horário de Saída:
                        <input type="time" name="exitTime" required />
                    </label>
                    <button type="submit" className={styles.saveButton}>Salvar</button>
                </form>
                <section className={styles.historySection}>
                    <h4>Histórico de Presenças</h4>
                    <div className={styles.filterDateContainer}>
                        <label htmlFor="filterDate">Filtrar por Data:</label>
                        <input
                            type="date"
                            id="filterDate"
                            value={filterDate}
                            onChange={handleDateFilterChange}
                            className={styles.filterDateInput}
                        />
                    </div>
                    <div className={styles.historyContainer}>
                        <table className={styles.historyTable}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Horário de Entrada</th>
                                    <th>Horário de Saída</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPresenceHistory.map((presence, index) => (
                                    <tr key={index}>
                                        <td>{presence.name}</td>
                                        <td>{presence.entryTime}</td>
                                        <td>{presence.exitTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default FichaPresenca;

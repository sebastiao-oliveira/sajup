const AuthService = {
    login: (userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
    },

    logout: () => {
        // Remove apenas os dados de sessão, mantendo os dados do sistema
        sessionStorage.removeItem('user');
    },

    getUser: () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!sessionStorage.getItem('user');
    }
};

export default AuthService;

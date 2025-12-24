import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
                        headers: { 'x-auth-token': token }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error("Auth load error", err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        // Reload user data or just set minimal user state if you decoding jwt
        // Ideally we fetch 'me' again or decode the token. For now, simple reload.
        const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: { 'x-auth-token': res.data.token }
        });
        setUser(userRes.data);
    };

    const signup = async (name, email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { name, email, password });
        localStorage.setItem('token', res.data.token);
        const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: { 'x-auth-token': res.data.token }
        });
        setUser(userRes.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

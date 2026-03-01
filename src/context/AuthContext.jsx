import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('pathway_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [usersCount, setUsersCount] = useState(128); // Mock stats
    const [sessionCount, setSessionCount] = useState(45); // Mock stats

    useEffect(() => {
        if (user) {
            localStorage.setItem('pathway_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('pathway_user');
        }
    }, [user]);

    const login = (email, password) => {
        // Mock Authentication
        if (email === 'student@example.com' && password === 'student123') {
            setUser({ email, role: 'student', name: 'Alex Student' });
            return true;
        } else if (email === 'admin@example.com' && password === 'admin123') {
            setUser({ email, role: 'admin', name: 'Admin User' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    // Function to switch roles without re-logging in (as requested)
    const switchRole = (newRole) => {
        if (user) {
            setUser({ ...user, role: newRole });
        }
    };

    const bookSession = () => {
        setSessionCount(prev => prev + 1);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, switchRole, usersCount, sessionCount, bookSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import { careersData, counselorsData, resourcesData } from '../data'; // Initial dummy sets for reset purposes

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    // State for all our business logic: users, sessions, paths, resources, assessment logs
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('pathway_users');
        if (saved) return JSON.parse(saved);
        return [
            { id: 'u1', name: 'Alex Student', email: 'student@example.com', role: 'student', password: 'student123', profileCompleted: 85, savedCareers: [1, 3], image: '' },
            { id: 'a1', name: 'Admin Master', email: 'admin@example.com', role: 'admin', password: 'admin123', profileCompleted: 100, savedCareers: [], image: '' }
        ];
    });

    const [activeUser, setActiveUser] = useState(() => {
        const saved = localStorage.getItem('pathway_active_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [sessions, setSessions] = useState(() => {
        const saved = localStorage.getItem('pathway_sessions');
        if (saved) return JSON.parse(saved);
        return [
            { id: 's1', userId: 'u1', counselorId: 1, counselorName: 'Dr. Sarah Jenkins', date: '2026-10-24', time: '10:00 AM', status: 'upcoming', type: 'Tech Industry Focus' }
        ];
    });

    const [careers, setCareers] = useState(() => {
        const saved = localStorage.getItem('pathway_careers');
        if (saved) {
            const parsed = JSON.parse(saved);
            // If local cache is old and missing the new 12 paths, or has broken imagery, overwrite it with our new image-enriched data!
            if (parsed.length >= careersData.length && parsed.every(c => c.image) && !parsed.some(c => c.image.includes('145539'))) {
                return parsed;
            }
        }
        return careersData;
    });

    const [counselors, setCounselors] = useState(() => {
        const saved = localStorage.getItem('pathway_counselors');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Ignore cache if it contains our old fake high ratings to force the reset
            if (parsed.length >= counselorsData.length && !parsed.some(c => c.reviews > 50)) {
                return parsed;
            }
        }
        return counselorsData;
    });

    const [activityLogs, setActivityLogs] = useState(() => {
        const saved = localStorage.getItem('pathway_logs');
        if (saved) return JSON.parse(saved);
        return [
            { id: 'log1', userId: 'u1', userName: 'Alex Student', action: 'completed Career Assessment', timestamp: Date.now() - 600000 }
        ];
    });

    const [resources, setResources] = useState(() => {
        const saved = localStorage.getItem('pathway_resources');
        return saved ? JSON.parse(saved) : resourcesData;
    });

    // Persist state changes to localStorage
    useEffect(() => {
        localStorage.setItem('pathway_users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (activeUser) {
            localStorage.setItem('pathway_active_user', JSON.stringify(activeUser));
        } else {
            localStorage.removeItem('pathway_active_user');
        }
    }, [activeUser]);

    useEffect(() => {
        localStorage.setItem('pathway_sessions', JSON.stringify(sessions));
    }, [sessions]);

    useEffect(() => {
        localStorage.setItem('pathway_careers', JSON.stringify(careers));
    }, [careers]);

    useEffect(() => {
        localStorage.setItem('pathway_counselors', JSON.stringify(counselors));
    }, [counselors]);

    useEffect(() => {
        localStorage.setItem('pathway_logs', JSON.stringify(activityLogs));
    }, [activityLogs]);

    useEffect(() => {
        localStorage.setItem('pathway_resources', JSON.stringify(resources));
    }, [resources]);

    // Helper to add activity log
    const logActivity = (userId, userName, action) => {
        const newLog = {
            id: `log_${Date.now()}`,
            userId,
            userName,
            action,
            timestamp: Date.now()
        };
        setActivityLogs(prev => [newLog, ...prev]);
    };


    // User Authentication
    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setActiveUser(user);
            logActivity(user.id, user.name, 'logged in');
            return true;
        }
        return false;
    };

    const register = (name, email, password, role) => {
        if (users.find(u => u.email === email)) return false;

        const newUser = {
            id: `u_${Date.now()}`,
            name,
            email,
            password,
            role,
            image: '',
            profileCompleted: 0,
            savedCareers: []
        };
        setUsers([...users, newUser]);
        setActiveUser(newUser);
        logActivity(newUser.id, newUser.name, 'registered a new account');
        return true;
    };

    const logout = () => {
        if (activeUser) logActivity(activeUser.id, activeUser.name, 'logged out');
        setActiveUser(null);
    };

    const switchRole = (newRole) => {
        if (activeUser) {
            const updatedUser = { ...activeUser, role: newRole };
            setActiveUser(updatedUser);
            // We don't save role switches temporarily to 'users' db array to keep real roles intact
        }
    };

    const updateUser = (updatedInfo) => {
        if (!activeUser) return;
        const newUserState = { ...activeUser, ...updatedInfo };
        setActiveUser(newUserState);
        setUsers(users.map(u => u.id === activeUser.id ? newUserState : u));
        logActivity(activeUser.id, activeUser.name, 'updated their profile');
    };


    // Student Actions
    const bookSession = (counselorId, counselorName, date, time, type) => {
        if (!activeUser) return;
        const newSession = {
            id: `s_${Date.now()}`,
            userId: activeUser.id,
            counselorId,
            counselorName,
            date,
            time,
            status: 'upcoming',
            type
        };
        setSessions([...sessions, newSession]);
        logActivity(activeUser.id, activeUser.name, `booked session with ${counselorName}`);
    };

    const toggleSaveCareer = (careerId) => {
        if (!activeUser) return;

        setUsers(prevUsers => prevUsers.map(u => {
            if (u.id === activeUser.id) {
                const isSaved = u.savedCareers.includes(careerId);
                const savedCareers = isSaved ? u.savedCareers.filter(id => id !== careerId) : [...u.savedCareers, careerId];

                // Update active user context immediately
                setActiveUser({ ...activeUser, savedCareers });

                logActivity(u.id, u.name, isSaved ? 'unsaved a career' : 'saved a new career');
                return { ...u, savedCareers };
            }
            return u;
        }));
    };

    const completeAssessment = (topCategory) => {
        if (!activeUser) return;
        logActivity(activeUser.id, activeUser.name, `completed Assessment (matched: ${topCategory})`);

        // Update profile completion if it was empty
        setUsers(prevUsers => prevUsers.map(u => {
            if (u.id === activeUser.id) {
                const updatedUser = { ...u, profileCompleted: Math.max(u.profileCompleted, 50) };
                setActiveUser(updatedUser);
                return updatedUser;
            }
            return u;
        }));
    };


    // Admin Actions
    const addCareer = (newCareer) => {
        if (activeUser?.role !== 'admin') return;
        const career = { ...newCareer, id: Date.now() };
        setCareers([...careers, career]);
        logActivity(activeUser.id, activeUser.name, 'added a new career path to library');
    };

    const removeCareer = (id) => {
        if (activeUser?.role !== 'admin') return;
        setCareers(careers.filter(c => c.id !== id));
        logActivity(activeUser.id, activeUser.name, 'removed a career path');
    };

    const addCounselor = (newCounselor) => {
        if (activeUser?.role !== 'admin') return;
        const counselor = { ...newCounselor, id: Date.now(), rating: 5.0, reviews: 0 };
        setCounselors([...counselors, counselor]);
        logActivity(activeUser.id, activeUser.name, 'added a new counselor');
    };

    const removeCounselor = (id) => {
        if (activeUser?.role !== 'admin') return;
        setCounselors(counselors.filter(c => c.id !== id));
        logActivity(activeUser.id, activeUser.name, 'removed a counselor');
    };

    const rateCounselor = (counselorId, newRating) => {
        setCounselors(prev => prev.map(c => {
            if (c.id === counselorId) {
                const currentRating = parseFloat(c.rating) || 5.0;
                const currentReviews = c.reviews || 0;
                const totalStars = (currentRating * currentReviews) + newRating;
                const newReviews = currentReviews + 1;
                const newAvg = (totalStars / newReviews).toFixed(1);
                return { ...c, rating: parseFloat(newAvg), reviews: newReviews };
            }
            return c;
        }));
        if (activeUser) logActivity(activeUser.id, activeUser.name, 'rated a counselor');
    };

    const updateSessionStatus = (sessionId, newStatus) => {
        setSessions(sessions.map(s => s.id === sessionId ? { ...s, status: newStatus } : s));
        logActivity(activeUser.id, activeUser.name, `updated session status to ${newStatus}`);
    };

    const addResource = (newResource) => {
        if (activeUser?.role !== 'admin') return;
        const res = { ...newResource, id: Date.now() };
        setResources([...resources, res]);
        logActivity(activeUser.id, activeUser.name, 'added a new resource');
    };

    const removeResource = (id) => {
        if (activeUser?.role !== 'admin') return;
        setResources(resources.filter(r => r.id !== id));
        logActivity(activeUser.id, activeUser.name, 'removed a resource');
    };


    return (
        <AppContext.Provider value={{
            user: activeUser,
            users,
            login,
            register,
            logout,
            switchRole,
            sessions,
            bookSession,
            updateSessionStatus,
            careers,
            addCareer,
            removeCareer,
            toggleSaveCareer,
            counselors,
            addCounselor,
            removeCounselor,
            rateCounselor,
            activityLogs,
            completeAssessment,
            resources,
            addResource,
            removeResource,
            updateUser
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, BookOpen, Users, FileText, Calendar, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const { user, switchRole, logout } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    if (!user) return null;

    return (
        <nav className="navbar" style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 2rem' }}>

                {/* Logo */}
                <NavLink to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111827', fontWeight: 700, fontSize: '1.25rem' }}>
                    <div style={{ padding: '0.25rem', background: '#eff6ff', borderRadius: '50%', color: '#2563eb' }}>
                        <Compass size={24} />
                    </div>
                    <span>CareerPath</span>
                </NavLink>

                {/* Nav Links */}
                <div className="nav-links" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    {user.role === 'admin' ? (
                        <>
                            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <LayoutDashboard size={18} /> Dashboard
                            </NavLink>
                            <NavLink to="/careers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <BookOpen size={18} /> Career Paths
                            </NavLink>
                            <NavLink to="/counselors" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <Users size={18} /> Counselors
                            </NavLink>
                            <NavLink to="/resources" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <FileText size={18} /> Resources
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                                <Compass size={18} /> Home
                            </NavLink>
                            <NavLink to="/student-dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                                <LayoutDashboard size={18} /> Dashboard
                            </NavLink>
                            <NavLink to="/careers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <BookOpen size={18} /> Career Paths
                            </NavLink>
                            <NavLink to="/counselors" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <Users size={18} /> Counselors
                            </NavLink>
                            <NavLink to="/resources" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <FileText size={18} /> Resources
                            </NavLink>
                            <NavLink to="/assessment" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <Compass size={18} /> Assessment
                            </NavLink>
                            <NavLink to="/my-sessions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <Calendar size={18} /> My Sessions
                            </NavLink>
                        </>
                    )}
                </div>

                {/* User Actions */}
                <div className="nav-actions" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {/* User Info */}
                    <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', cursor: 'pointer' }}>
                        <div style={{ width: '32px', height: '32px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {user.image ? (
                                <img src={user.image} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <User size={18} style={{ color: '#6b7280' }} />
                            )}
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>
                            {user.name}
                        </span>
                        <span style={{ padding: '0.15rem 0.6rem', background: '#eff6ff', color: '#2563eb', fontSize: '0.75rem', borderRadius: '16px', fontWeight: 600, textTransform: 'capitalize' }}>
                            {user.role}
                        </span>
                    </NavLink>
                    <button onClick={handleLogout} style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }} title="Sign Out">
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

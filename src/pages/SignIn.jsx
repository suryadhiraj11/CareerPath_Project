import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { BrainCircuit, Mail, Lock, ArrowRight, User, Shield } from 'lucide-react';

const SignIn = () => {
    const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');

    const { login, register } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'signin') {
            const success = login(email, password);
            if (success) {
                // Determine routing based on who logged in
                // We'll just wait 100ms or grab the role directly, but login() doesn't return the user object directly.
                // It's safer to just navigate to '/' and let the navbar handle them, or '/careers'
                navigate('/');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } else {
            // Sign Up Flow
            if (password.length < 6) {
                return setError('Password must be at least 6 characters long.');
            }
            if (!name.trim()) {
                return setError('Full Name is required.');
            }

            const success = register(name, email, password, role);
            if (success) {
                navigate(role === 'admin' ? '/admin' : '/');
            } else {
                setError('An account with this email already exists.');
            }
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '2rem' }}>
            <div className="card animate-fade-in" style={{ maxWidth: '500px', width: '100%', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>

                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 50%)', zIndex: 0 }}></div>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', marginBottom: '1rem' }}>
                        <BrainCircuit size={32} />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#111827', fontWeight: 800 }}>
                        Welcome to CareerPath
                    </h1>
                    <p style={{ color: '#4b5563', fontSize: '1rem' }}>
                        {mode === 'signin' ? 'Sign in to access your dashboard.' : 'Create an account to get started.'}
                    </p>
                </div>

                {/* Mode Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: '#f3f4f6', padding: '0.25rem', borderRadius: '8px', position: 'relative', zIndex: 1 }}>
                    <button
                        type="button"
                        onClick={() => { setMode('signin'); setError(''); }}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: mode === 'signin' ? '#fff' : 'transparent', color: mode === 'signin' ? '#111827' : '#6b7280', fontWeight: 600, boxShadow: mode === 'signin' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => { setMode('signup'); setError(''); }}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: mode === 'signup' ? '#fff' : 'transparent', color: mode === 'signup' ? '#111827' : '#6b7280', fontWeight: 600, boxShadow: mode === 'signup' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                        Create Account
                    </button>
                </div>

                {error && (
                    <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center', position: 'relative', zIndex: 1, fontWeight: 500, fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}>

                    {mode === 'signup' && (
                        <div>
                            <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="John Doe"
                                    style={{ paddingLeft: '3rem' }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="you@example.com"
                                style={{ paddingLeft: '3rem' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                className="form-input"
                                placeholder={mode === 'signup' ? 'Create a secure password' : 'Enter your password'}
                                style={{ paddingLeft: '3rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {mode === 'signup' && (
                        <div>
                            <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' }}>Account Type</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div
                                    onClick={() => setRole('student')}
                                    style={{ flex: 1, padding: '1rem', border: `1px solid ${role === 'student' ? '#2563eb' : '#e5e7eb'}`, background: role === 'student' ? '#eff6ff' : '#fff', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                                >
                                    <User size={18} style={{ color: role === 'student' ? '#2563eb' : '#6b7280' }} />
                                    <span style={{ fontWeight: 600, color: role === 'student' ? '#1d4ed8' : '#374151', fontSize: '0.95rem' }}>Student</span>
                                </div>
                                <div
                                    onClick={() => setRole('admin')}
                                    style={{ flex: 1, padding: '1rem', border: `1px solid ${role === 'admin' ? '#2563eb' : '#e5e7eb'}`, background: role === 'admin' ? '#eff6ff' : '#fff', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                                >
                                    <Shield size={18} style={{ color: role === 'admin' ? '#2563eb' : '#6b7280' }} />
                                    <span style={{ fontWeight: 600, color: role === 'admin' ? '#1d4ed8' : '#374151', fontSize: '0.95rem' }}>Admin</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.9rem', justifyContent: 'center', fontSize: '1rem', fontWeight: 600 }}>
                        {mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                    </button>

                    {/* Link fallback for switching */}
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            type="button"
                            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
                            style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
                        >
                            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default SignIn;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { User, Mail, Lock, Shield, CheckCircle, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, updateUser, logout } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [image, setImage] = useState(user.image || '');
    const [success, setSuccess] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ name, email, password, image });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    if (!user) return null;

    return (
        <div className="container animate-fade-in" style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
                    Profile Settings
                </h1>
                <p style={{ color: '#4b5563', fontSize: '1.05rem' }}>
                    Manage your personal information and security.
                </p>
            </div>

            <div className="card" style={{ padding: '2.5rem', background: '#fff' }}>

                {success && (
                    <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#16a34a', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                        <CheckCircle size={20} /> Profile updated successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '80px', height: '80px', background: '#eff6ff', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {image ? (
                                <img src={image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <User size={40} />
                            )}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0, marginBottom: '0.25rem' }}>Account Role</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Shield size={16} style={{ color: user.role === 'admin' ? '#9333ea' : '#16a34a' }} />
                                <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#4b5563', fontSize: '0.95rem' }}>{user.role}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                className="form-input"
                                style={{ paddingLeft: '3rem' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' }}>Profile Picture Upload</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-input"
                                onChange={handleImageUpload}
                                style={{ padding: '0.5rem', background: '#fff' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                className="form-input"
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
                                style={{ paddingLeft: '3rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontWeight: 600, fontSize: '1rem', flex: 1 }}>
                            Save Changes
                        </button>
                        <button type="button" onClick={handleLogout} style={{ padding: '0.85rem 2rem', fontWeight: 600, fontSize: '1rem', flex: 1, background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'background 0.2s' }}>
                            <LogOut size={18} /> Sign Out Securely
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;

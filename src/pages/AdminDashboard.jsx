import React, { useState } from 'react';
import { Users, Calendar, BookOpen, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
    const { users, sessions, careers, counselors, resources, updateSessionStatus, removeCounselor, removeResource } = useAppContext();
    const [activeTab, setActiveTab] = useState('Sessions Overview'); // Set to default to show feature

    const studentCount = users.filter(u => u.role === 'student').length;
    const sessionCount = sessions.length;
    const careerCount = careers.length;

    return (
        <div className="container animate-fade-in" style={{ padding: '3rem 2rem' }}>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
                    Admin Dashboard
                </h1>
                <p style={{ color: '#4b5563', fontSize: '1.05rem' }}>
                    Manage resources, track engagement, and oversee counseling sessions.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {/* Total Users */}
                <div className="card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Total Users</p>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>{studentCount}</h2>
                        </div>
                        <div style={{ background: '#eff6ff', color: '#2563eb', padding: '0.6rem', borderRadius: '50%' }}>
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                {/* Total Sessions */}
                <div className="card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Total Sessions</p>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>{sessionCount}</h2>
                        </div>
                        <div style={{ background: '#faf5ff', color: '#9333ea', padding: '0.6rem', borderRadius: '50%' }}>
                            <Calendar size={24} />
                        </div>
                    </div>
                </div>

                {/* Total Careers */}
                <div className="card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Career Paths</p>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>{careerCount}</h2>
                        </div>
                        <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '0.6rem', borderRadius: '50%' }}>
                            <BookOpen size={24} />
                        </div>
                    </div>
                </div>

                {/* Total Resources */}
                <div className="card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Resources</p>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>{resources?.length || 0}</h2>
                        </div>
                        <div style={{ background: '#fff7ed', color: '#ea580c', padding: '0.6rem', borderRadius: '50%' }}>
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                {['User Engagement', 'Sessions Overview', 'Counselor Management', 'Resources'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            border: 'none',
                            background: activeTab === tab ? '#f3f4f6' : 'transparent',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            color: activeTab === tab ? '#111827' : '#4b5563',
                            cursor: 'pointer'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content: Sessions Overview tab explicitly details booked sessions */}
            {activeTab === 'Sessions Overview' && (
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', paddingBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Global Session Tracker</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>Review all counselor bookings requested by users.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {sessions.filter(s => s.status !== 'cancelled').length === 0 ? (
                            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No active sessions found.</p>
                        ) : (
                            sessions.filter(s => s.status !== 'cancelled').map(session => {
                                const student = users.find(u => u.id === session.userId);

                                return (
                                    <div key={session.id} className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff' }}>

                                        {/* Student Info */}
                                        <div style={{ flex: 1 }}>
                                            <p style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student</p>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: 0, marginBottom: '0.25rem' }}>{student ? student.name : 'Unknown User'}</h4>
                                            <p style={{ color: '#4b5563', fontSize: '0.85rem', margin: 0 }}>{student?.email}</p>
                                        </div>

                                        {/* Counselor Info */}
                                        <div style={{ flex: 1, paddingLeft: '1.5rem', borderLeft: '1px solid #e5e7eb' }}>
                                            <p style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Counselor Requested</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', margin: 0 }}>{session.counselorName}</h4>
                                            </div>
                                            <span style={{ fontSize: '0.85rem', color: '#2563eb', padding: '0.2rem 0.6rem', background: '#eff6ff', borderRadius: '16px', fontWeight: 500, display: 'inline-block' }}>
                                                {session.type}
                                            </span>
                                        </div>

                                        {/* Date/Time Info */}
                                        <div style={{ flex: 1, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                                {session.status === 'upcoming' && (
                                                    <button
                                                        onClick={() => updateSessionStatus(session.id, 'cancelled')}
                                                        style={{ background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#ef4444', fontWeight: 600, padding: '0.25rem 0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600,
                                                    background: session.status === 'upcoming' ? '#111827' : (session.status === 'completed' ? '#f0fdf4' : '#fef2f2'),
                                                    color: session.status === 'upcoming' ? '#fff' : (session.status === 'completed' ? '#16a34a' : '#ef4444'),
                                                    display: 'inline-block'
                                                }}>
                                                    {session.status.toUpperCase()}
                                                </span>
                                            </div>

                                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', color: '#4b5563', fontSize: '0.9rem' }}>
                                                    <span style={{ fontWeight: 600, color: '#111827' }}>{session.date}</span>
                                                    <Calendar size={16} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', color: '#4b5563', fontSize: '0.9rem' }}>
                                                    <span style={{ fontWeight: 600, color: '#111827' }}>{session.time}</span>
                                                    <Clock size={16} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* User Engagement (default) */}
            {activeTab === 'User Engagement' && (
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', paddingBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>User Engagement Metrics</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>Track how users interact with the platform</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {users.filter(u => u.role === 'student').map((student, i) => {
                            const userSessions = sessions.filter(s => s.userId === student.id).length;
                            const userCareers = student.savedCareers ? student.savedCareers.length : 0;

                            return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: 0, marginBottom: '0.25rem' }}>{student.name}</h4>
                                        <p style={{ color: '#4b5563', fontSize: '0.9rem', margin: '0 0 0.25rem 0' }}>{student.email}</p>
                                        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>Last active: 2/28/2026</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '2.5rem', textAlign: 'center' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb', margin: 0 }}>{userSessions}</h3>
                                            <p style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>Sessions</p>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a', margin: 0 }}>0</h3>
                                            <p style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>Resources</p>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#9333ea', margin: 0 }}>{userCareers}</h3>
                                            <p style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>Careers</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {activeTab === 'Counselor Management' && (
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', paddingBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Counselor Management</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>Review and manage counselors on the platform.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {counselors?.length === 0 ? (
                            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No counselors found.</p>
                        ) : (
                            counselors?.map(counselor => (
                                <div key={counselor.id} className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <img src={counselor.image} alt={counselor.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: 0 }}>{counselor.name}</h4>
                                            <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>{counselor.specialization}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm(`Remove counselor ${counselor.name}?`)) {
                                                    removeCounselor(counselor.id);
                                                }
                                            }}
                                            style={{ background: '#fee2e2', color: '#ef4444', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'Resources' && (
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', paddingBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Resource Management</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>Review and manage resources on the platform.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {resources?.length === 0 ? (
                            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No resources found.</p>
                        ) : (
                            resources?.map(resource => (
                                <div key={resource.id} className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#fff' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', margin: 0 }}>{resource.title}</h4>
                                        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>{resource.category} • {resource.type}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm(`Remove resource ${resource.title}?`)) {
                                                    removeResource(resource.id);
                                                }
                                            }}
                                            style={{ background: '#fee2e2', color: '#ef4444', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;

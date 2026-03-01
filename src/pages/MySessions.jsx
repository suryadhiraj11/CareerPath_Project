import React, { useState } from 'react';
import { Calendar, Clock, X, Check, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const MySessions = () => {
    const { user, sessions, counselors, updateSessionStatus } = useAppContext();
    const [activeTab, setActiveTab] = useState('upcoming');

    if (!user) return null;

    const mySessions = sessions.filter(s => s.userId === user.id);
    const upcoming = mySessions.filter(s => s.status === 'upcoming');
    const completed = mySessions.filter(s => s.status === 'completed');
    const cancelled = mySessions.filter(s => s.status === 'cancelled');

    const getFilteredSessions = () => {
        if (activeTab === 'upcoming') return upcoming;
        if (activeTab === 'completed') return completed;
        if (activeTab === 'cancelled') return cancelled;
        return [];
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>

            {/* Header matching Image 3 */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
                    My Sessions
                </h1>
                <p style={{ color: '#4b5563', fontSize: '1.05rem' }}>
                    Manage your counseling sessions and track your progress.
                </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    style={{
                        padding: '0.5rem 1rem', borderRadius: '9999px', border: 'none',
                        background: activeTab === 'upcoming' ? '#f3f4f6' : 'transparent',
                        fontWeight: 600, fontSize: '0.95rem',
                        color: activeTab === 'upcoming' ? '#111827' : '#4b5563',
                        cursor: 'pointer'
                    }}
                >
                    Upcoming ({upcoming.length})
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    style={{
                        padding: '0.5rem 1rem', borderRadius: '9999px', border: 'none',
                        background: activeTab === 'completed' ? '#f3f4f6' : 'transparent',
                        fontWeight: 600, fontSize: '0.95rem',
                        color: activeTab === 'completed' ? '#111827' : '#4b5563',
                        cursor: 'pointer'
                    }}
                >
                    Completed ({completed.length})
                </button>
                <button
                    onClick={() => setActiveTab('cancelled')}
                    style={{
                        padding: '0.5rem 1rem', borderRadius: '9999px', border: 'none',
                        background: activeTab === 'cancelled' ? '#f3f4f6' : 'transparent',
                        fontWeight: 600, fontSize: '0.95rem',
                        color: activeTab === 'cancelled' ? '#111827' : '#4b5563',
                        cursor: 'pointer'
                    }}
                >
                    Cancelled ({cancelled.length})
                </button>
            </div>

            {/* Sessions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {getFilteredSessions().length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '16px', background: '#fff' }}>
                        No sessions available in this category.
                    </div>
                ) : (
                    getFilteredSessions().map((session, i) => {
                        const counselor = counselors.find(c => c.id === session.counselorId);
                        const badgeBg = session.status === 'upcoming' ? '#111827' : (session.status === 'completed' ? '#16a34a' : '#ef4444');
                        const badgeText = session.status === 'upcoming' ? 'Scheduled' : (session.status === 'completed' ? 'Completed' : 'Cancelled');

                        return (
                            <div key={i} style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '16px', background: '#fff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                                {/* Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                        {counselor && (
                                            <img src={counselor.image} alt={counselor.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                                        )}
                                        <div>
                                            <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111827', marginBottom: '0.2rem' }}>
                                                {session.counselorName}
                                            </h4>
                                            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Career Counselor</p>
                                        </div>
                                    </div>
                                    <span style={{ background: badgeBg, color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {badgeText}
                                    </span>
                                </div>

                                {/* Details */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', fontSize: '0.95rem' }}>
                                        <Calendar size={18} style={{ color: '#3b82f6' }} /> {/* Match Image blue calendar icon */}
                                        <span>{session.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', fontSize: '0.95rem' }}>
                                        <Clock size={18} style={{ color: '#16a34a' }} /> {/* Match Image green clock icon */}
                                        <span>{session.time}</span>
                                    </div>
                                </div>

                                {/* Tags matching image */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                                    {session.type && session.type.split('/').map(t => t.trim()).map(tag => (
                                        <span key={tag} style={{ border: '1px solid #e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '24px', fontSize: '0.8rem', color: '#4b5563', fontWeight: 500 }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer Buttons */}
                                {session.status === 'upcoming' && (
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            onClick={() => updateSessionStatus(session.id, 'cancelled')}
                                            className="btn btn-secondary"
                                            style={{ flex: 1, padding: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#111827', fontWeight: 600 }}
                                        >
                                            <X size={18} style={{ marginRight: '0.5rem' }} /> Cancel
                                        </button>
                                        <button
                                            onClick={() => updateSessionStatus(session.id, 'completed')}
                                            className="btn btn-primary"
                                            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', fontWeight: 600 }}
                                        >
                                            <CheckCircle2 size={18} style={{ marginRight: '0.5rem' }} /> Complete
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MySessions;




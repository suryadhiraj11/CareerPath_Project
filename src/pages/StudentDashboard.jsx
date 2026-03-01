import React from 'react';
import { Calendar, BookOpen, Target, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const StudentDashboard = () => {
    const { user, sessions, careers, activityLogs } = useAppContext();

    if (!user) return null;

    const mySessions = sessions.filter(s => s.userId === user.id);
    const mySavedCareers = careers.filter(c => user.savedCareers?.includes(c.id));

    // Dynamic Profile Completion Calculation (Total: 100%)
    let currentCompletion = 0;

    // 1. Initial Assessment Taken (25%)
    const hasTakenAssessment = activityLogs.some(log => log.userId === user.id && log.action.includes('completed Assessment'));
    if (hasTakenAssessment) currentCompletion += 25;

    // 2. Personalization/Customization (25%)
    if (user.image) currentCompletion += 25;

    // 3. Saved at least one Career Path (25%)
    if (mySavedCareers.length > 0) currentCompletion += 25;

    // 4. Booked at least one Session (25%)
    if (mySessions.length > 0) currentCompletion += 25;

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome back, <span className="text-gradient">{user.name.split(' ')[0]}</span>!</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Track your career journey and upcoming sessions.</p>
                </div>
            </div>

            <div className="cards-grid" style={{ marginBottom: '3rem' }}>
                <div className="card glass">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p className="stat-label">Profile Completion</p>
                            <p className="stat-value">{currentCompletion}%</p>
                        </div>
                        <div className="card-icon" style={{ marginBottom: 0 }}>
                            <CheckCircle size={24} />
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
                        <div style={{ width: `${currentCompletion}%`, height: '100%', background: 'var(--gradient-primary)', transition: 'width 0.5s ease' }}></div>
                    </div>
                </div>

                <div className="card glass">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p className="stat-label">Saved Careers</p>
                            <p className="stat-value">{user.savedCareers.length}</p>
                        </div>
                        <div className="card-icon" style={{ marginBottom: 0 }}>
                            <BookOpen size={24} />
                        </div>
                    </div>
                </div>

                <div className="card glass">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p className="stat-label">Upcoming Sessions</p>
                            <p className="stat-value">{mySessions.filter(s => s.status === 'upcoming').length}</p>
                        </div>
                        <div className="card-icon" style={{ marginBottom: 0 }}>
                            <Calendar size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
                {/* My Saved Careers Section */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Target color="#2563eb" /> My Bookmarked Career Paths
                    </h3>

                    {mySavedCareers.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {mySavedCareers.map((career, i) => (
                                <div key={i} className="card animate-fade-in" style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                                    {career.image && (
                                        <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                                            <img src={career.image} alt={career.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#fff', padding: '0.25rem 0.75rem', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                                ★ Saved
                                            </div>
                                        </div>
                                    )}
                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 0.25rem 0' }}>{career.title}</h4>
                                            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#f3f4f6', color: '#4b5563', borderRadius: '16px', fontWeight: 500 }}>
                                                {career.category}
                                            </span>
                                        </div>
                                        <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.5', flex: 1, marginBottom: '1.5rem' }}>
                                            {career.description}
                                        </p>
                                        <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Expected Salary</span>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{career.salary}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f9fafb', borderRadius: '12px', border: '2px dashed #e5e7eb' }}>
                            <BookOpen size={48} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>No careers saved yet</h4>
                            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Explore the Career Library to find and bookmark paths you're interested in.</p>
                        </div>
                    )}
                </div>

                {/* My Sessions Section */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock color="#16a34a" /> Upcoming Sessions
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {mySessions.length > 0 ? (
                            mySessions.map((session, i) => (
                                <div key={i} style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', borderLeft: session.status === 'upcoming' ? '4px solid #2563eb' : '4px solid #16a34a', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111827', margin: '0 0 0.25rem 0' }}>{session.counselorName}</p>
                                            <p style={{ color: '#4b5563', fontSize: '0.9rem', margin: 0 }}>{session.type}</p>
                                        </div>
                                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: session.status === 'upcoming' ? '#eff6ff' : '#f0fdf4', color: session.status === 'upcoming' ? '#2563eb' : '#16a34a' }}>
                                            {session.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1.5rem', color: '#4b5563', fontSize: '0.9rem', background: '#f9fafb', padding: '0.75rem', borderRadius: '8px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}><Calendar size={16} color="#6b7280" /> {session.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}><Clock size={16} color="#6b7280" /> {session.time}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: '#f9fafb', borderRadius: '12px', border: '2px dashed #e5e7eb' }}>
                                <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>No sessions booked right now.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;

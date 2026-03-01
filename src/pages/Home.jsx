import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Compass, BookOpen, Users, Star, BrainCircuit, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>

            {/* Hero Section */}
            <section style={{ position: 'relative', paddingTop: '6rem', paddingBottom: '6rem', overflow: 'hidden' }}>
                {/* Background artistic elements */}
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(147, 51, 234, 0.06) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>

                <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                        {/* Text Content */}
                        <div style={{ maxWidth: '600px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: '#eff6ff', color: '#2563eb', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', border: '1px solid #bfdbfe' }}>
                                <Star size={14} /> AI-Powered Career Guidance
                            </div>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#111827', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                                Discover Your <span style={{ background: 'linear-gradient(135deg, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>True Potential</span>
                            </h1>
                            <p style={{ fontSize: '1.15rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                Get expert career guidance, personalized mentorship, and smart recommendations to help you make informed decisions based on your unique interests and skills.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => navigate('/assessment')}
                                    className="btn btn-primary"
                                    style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600, boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)' }}
                                >
                                    Take Assessment <BrainCircuit size={20} />
                                </button>
                                <button
                                    onClick={() => navigate('/counselors')}
                                    style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600, background: '#fff', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#2563eb'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#111827'; }}
                                >
                                    Find a Mentor <ArrowRight size={20} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #f3f4f6' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0 }}>500+</h4>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Career Paths</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0 }}>50+</h4>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Expert Mentors</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0 }}>10k+</h4>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Students Guided</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Content */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)', borderRadius: '24px', transform: 'rotate(6deg)', zIndex: 0 }}></div>
                            <div style={{ position: 'relative', background: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)', zIndex: 1, border: '1px solid #f3f4f6' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Students collaborating"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#dbeafe', color: '#1d4ed8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 700, color: '#1e293b', margin: 0, fontSize: '1.05rem' }}>Personalized Roadmap</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Crafted just for your success</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How PathWay Works</h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>We provide a structured path from confusion to clarity. Discover, learn, and connect with people who can get you there.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {/* Feature 1 */}
                        <div style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '20px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: '60px', height: '60px', background: '#eff6ff', color: '#2563eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <BrainCircuit size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Smart Assessment</h3>
                            <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Take our interactive quiz to map your unique interests, skills, and values to the perfect modern career options.</p>
                            <Link to="/assessment" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                                Take Quiz <ChevronRight size={16} />
                            </Link>
                        </div>

                        {/* Feature 2 */}
                        <div style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '20px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: '60px', height: '60px', background: '#f5f3ff', color: '#9333ea', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <BookOpen size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Library & Insights</h3>
                            <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Dive deep into thousands of roles. Understand salaries, required education, and daily responsibilities.</p>
                            <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#9333ea', fontWeight: 600, textDecoration: 'none' }}>
                                Browse Careers <ChevronRight size={16} />
                            </Link>
                        </div>

                        {/* Feature 3 */}
                        <div style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '20px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', transition: 'transform 0.3s', cursor: 'pointer' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: '60px', height: '60px', background: '#f0fdf4', color: '#16a34a', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Users size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>1-on-1 Mentorship</h3>
                            <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Directly book sessions with industry veterans and counselors to answer your specific questions and guide you.</p>
                            <Link to="/counselors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}>
                                Find Mentors <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section style={{ padding: '6rem 0', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#111827', color: '#fff', borderRadius: '32px', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>

                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(37,99,235,0.2) 0%, transparent 60%)', zIndex: 0 }}></div>

                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: '1.2' }}>Ready to shape your future?</h2>
                            <p style={{ fontSize: '1.2rem', color: '#9ca3af', marginBottom: '3rem', lineHeight: '1.6' }}>
                                Join thousands of students who have already discovered their true calling, built confidence, and launched successfully into their careers.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <button
                                        onClick={() => navigate('/assessment')}
                                        style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                                        onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'}
                                        onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
                                    >
                                        Start Your Journey
                                    </button>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d1d5db', fontSize: '0.9rem' }}>
                                        <CheckCircle2 size={18} style={{ color: '#10b981' }} /> 100% Free for Students
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d1d5db', fontSize: '0.9rem' }}>
                                        <CheckCircle2 size={18} style={{ color: '#10b981' }} /> Instant AI Assessment
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d1d5db', fontSize: '0.9rem' }}>
                                        <CheckCircle2 size={18} style={{ color: '#10b981' }} /> Vetted Counselors
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;

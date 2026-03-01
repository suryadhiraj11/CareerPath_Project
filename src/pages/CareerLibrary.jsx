import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Bookmark, BookmarkCheck, Briefcase, GraduationCap, TrendingUp, DollarSign, Plus, Trash2 } from 'lucide-react';

const CareerLibrary = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewingCareer, setViewingCareer] = useState(null);
    const { careers, user, toggleSaveCareer, addCareer, removeCareer } = useAppContext();

    const [showAddForm, setShowAddForm] = useState(false);
    const [newC, setNewC] = useState({ title: '', category: 'Technology', salary: '', growth: '', education: '', skills: '', description: '', image: '' });

    // Based on the image, the categories are explicit pills
    const categories = ['All', 'Technology', 'Business', 'Healthcare', 'Design', 'Creative', 'Engineering', 'Education', 'Finance'];

    const filteredCareers = careers.filter(career => {
        return selectedCategory === 'All' || career.category === selectedCategory;
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewC({ ...newC, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addCareer({
            ...newC,
            skills: newC.skills.split(',').map(s => s.trim())
        });
        alert('Career Path added successfully!');
        setShowAddForm(false);
        setNewC({ title: '', category: 'Technology', salary: '', growth: '', education: '', skills: '', description: '', image: '' });
    };

    return (
        <>
            <div className="container animate-fade-in" style={{ padding: '3rem 2rem' }}>

                {/* Header section closely matching Image 1 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
                            Explore Career Paths
                        </h1>
                        <p style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '600px', margin: 0 }}>
                            Discover various career options and find the perfect match for your interests and skills.
                        </p>
                    </div>

                    {user?.role === 'admin' && (
                        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                            <Plus size={18} /> Add Career Path
                        </button>
                    )}
                </div>

                {/* Admin Add Form */}
                {showAddForm && user?.role === 'admin' && (
                    <div className="card animate-fade-in" style={{ padding: '2rem', marginBottom: '3rem', maxWidth: '800px', background: '#fff' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Career Path</h3>
                        <form onSubmit={handleAddSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <input type="text" className="form-input" placeholder="Career Title" value={newC.title} onChange={e => setNewC({ ...newC, title: e.target.value })} required />
                            </div>
                            <div>
                                <select className="form-input" value={newC.category} onChange={e => setNewC({ ...newC, category: e.target.value })} required>
                                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <input type="text" className="form-input" placeholder="Salary Range (e.g. $80k - $120k)" value={newC.salary} onChange={e => setNewC({ ...newC, salary: e.target.value })} required />
                            </div>
                            <div>
                                <input type="text" className="form-input" placeholder="Expected Growth" value={newC.growth} onChange={e => setNewC({ ...newC, growth: e.target.value })} required />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <input type="text" className="form-input" placeholder="Education Needed" value={newC.education} onChange={e => setNewC({ ...newC, education: e.target.value })} required />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <input type="text" className="form-input" placeholder="Skills (comma separated)" value={newC.skills} onChange={e => setNewC({ ...newC, skills: e.target.value })} required />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 600 }}>Cover Image</label>
                                <input type="file" accept="image/*" className="form-input" onChange={handleImageUpload} required style={{ padding: '0.45rem', background: '#fff' }} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <textarea className="form-input" placeholder="Career Description" rows="3" value={newC.description} onChange={e => setNewC({ ...newC, description: e.target.value })} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>Publish Career Path</button>
                        </form>
                    </div>
                )}

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`btn btn-pill ${selectedCategory === cat ? 'active' : 'btn-secondary'}`}
                            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', border: selectedCategory === cat ? 'none' : '1px solid #e5e7eb' }}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Career Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {filteredCareers.length > 0 ? (
                        filteredCareers.map((career, index) => (
                            <div key={career.id} className="card animate-fade-in" style={{ animationDelay: `${(index % 3) * 50}ms`, border: '1px solid #e5e7eb', borderRadius: '16px', position: 'relative', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>

                                {user?.role === 'admin' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm(`Are you sure you want to permanently delete "${career.title}"?`)) {
                                                removeCareer(career.id);
                                            }
                                        }}
                                        style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: '#fee2e2', color: '#ef4444', padding: '0.4rem', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s', width: '30px', height: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                        title="Delete career"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}

                                {/* Card Image */}
                                {career.image && (
                                    <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                                        <img src={career.image} alt={career.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}

                                {/* Card Content */}
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0, marginBottom: '0.25rem' }}>{career.title}</h3>
                                            <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#6b7280', margin: 0 }}>{career.title}</h4>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', background: '#eff6ff', color: '#2563eb', borderRadius: '16px', fontWeight: 600 }}>
                                            {career.category}
                                        </span>
                                    </div>

                                    <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                                        {career.description}
                                    </p>

                                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', background: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>{career.salary}</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 600 }}>{career.growth}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setViewingCareer(career)}
                                        className="btn btn-secondary"
                                        style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 600, border: '1px solid #e5e7eb', color: '#111827', background: '#fff', cursor: 'pointer' }}
                                        onMouseOver={(e) => { e.currentTarget.style.background = '#f3f4f6' }}
                                        onMouseOut={(e) => { e.currentTarget.style.background = '#fff' }}
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
                            <h3>No careers found matching your criteria.</h3>
                        </div>
                    )}
                </div>

            </div>

            {/* Modal explicitly rendered OUTSIDE the CSS transform container to bind correctly to viewport */}
            {viewingCareer && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(17, 24, 39, 0.75)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div className="card animate-fade-in" style={{ background: '#fff', width: '100%', maxWidth: '800px', maxHeight: '95vh', overflowY: 'auto', borderRadius: '16px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <button
                            onClick={() => setViewingCareer(null)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: '#fff' }}
                        >
                            <X size={18} />
                        </button>

                        <div style={{ width: '100%', height: '140px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                            <img src={viewingCareer.image} alt={viewingCareer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.4) 100%)' }}></div>
                            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{viewingCareer.title}</h2>
                                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: '#fff', borderRadius: '16px', fontWeight: 600 }}>
                                    {viewingCareer.category}
                                </span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: '1.5', margin: 0 }}>
                                {viewingCareer.description}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}><DollarSign size={16} /> Salary Range</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{viewingCareer.salary}</div>
                                </div>
                                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontSize: '0.85rem', fontWeight: 600 }}><TrendingUp size={16} /> Projected Growth</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#14532d' }}>{viewingCareer.growth}</div>
                                </div>
                                <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '12px', border: '1px solid #fde68a', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400e', fontSize: '0.85rem', fontWeight: 600 }}><GraduationCap size={16} /> Education Needed</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#78350f' }}>{viewingCareer.education}</div>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Briefcase size={18} color="#2563eb" /> Key Skills Required
                                </h3>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {viewingCareer.skills.map(skill => (
                                        <span key={skill} style={{ padding: '0.35rem 0.85rem', background: '#f1f5f9', color: '#334155', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #e2e8f0' }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {user && user.role === 'student' && (
                                <button
                                    onClick={() => toggleSaveCareer(viewingCareer.id)}
                                    style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', background: user.savedCareers?.includes(viewingCareer.id) ? '#f3f4f6' : '#111827', color: user.savedCareers?.includes(viewingCareer.id) ? '#111827' : '#fff', border: user.savedCareers?.includes(viewingCareer.id) ? '1px solid #d1d5db' : 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                    {user.savedCareers?.includes(viewingCareer.id) ? (
                                        <><BookmarkCheck size={20} /> Saved to Dashboard</>
                                    ) : (
                                        <><Bookmark size={20} /> Save Career Path</>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CareerLibrary;

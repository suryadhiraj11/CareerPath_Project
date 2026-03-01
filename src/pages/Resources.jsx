import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FileText, Plus, ExternalLink, Image as ImageIcon, File, Trash2 } from 'lucide-react';

const Resources = () => {
    const { user, resources, addResource, removeResource } = useAppContext();
    const [showAddForm, setShowAddForm] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');
    const [type, setType] = useState('PDF');
    const [fileName, setFileName] = useState('');
    const [viewingResource, setViewingResource] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addResource({
            title,
            category,
            url,
            type,
            duration: type === 'PDF' ? 'Read' : 'View'
        });
        alert('Resource added successfully!');
        setShowAddForm(false);
        setTitle('');
        setCategory('');
        setUrl('');
        setFileName('');
        setType('PDF');
    };

    if (!user) return null;

    return (
        <div className="container animate-fade-in" style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
                        Library & Resources
                    </h1>
                    <p style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '600px' }}>
                        Access guides, articles, and media carefully curated to help you succeed.
                    </p>
                </div>

                {user.role === 'admin' && (
                    <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                        <Plus size={18} /> Add Resource
                    </button>
                )}
            </div>

            {/* Document Viewer Modal Overlay */}
            {viewingResource && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(17, 24, 39, 0.85)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#fff', padding: '0 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {viewingResource.type === 'Image' ? <ImageIcon size={20} /> : (viewingResource.type === 'PDF' ? <File size={20} /> : <FileText size={20} />)}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{viewingResource.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>{viewingResource.type} Format</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setViewingResource(null)}
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                        >
                            Close Viewer
                        </button>
                    </div>
                    <div style={{ flex: 1, background: '#fff', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                        {viewingResource.type === 'Image' ? (
                            <img src={viewingResource.url} alt={viewingResource.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '1rem' }} />
                        ) : (
                            <iframe src={viewingResource.url} style={{ width: '100%', height: '100%', border: 'none' }} title={viewingResource.title} />
                        )}
                    </div>
                </div>
            )}

            {/* Admin Add Resource Form */}
            {showAddForm && user.role === 'admin' && (
                <div className="card animate-fade-in" style={{ padding: '2rem', marginBottom: '3rem', maxWidth: '600px', background: '#fff' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: '#111827', fontWeight: 700 }}>Upload New Resource</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Resource Title</label>
                            <input type="text" className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Master Your Resume" required />
                        </div>
                        <div>
                            <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Category</label>
                            <input type="text" className="form-input" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Interview Prep" required />
                        </div>
                        <div>
                            <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Format</label>
                            <select className="form-input" value={type} onChange={e => setType(e.target.value)}>
                                <option value="PDF">PDF Document</option>
                                <option value="Image">Image / Graphic</option>
                                <option value="Video">Video Link</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Upload File (or paste Video link below)</label>
                            {type !== 'Video' ? (
                                <input type="file" accept={type === 'PDF' ? "application/pdf" : "image/*"} className="form-input" onChange={handleFileUpload} style={{ padding: '0.45rem', background: '#fff' }} required />
                            ) : (
                                <input type="url" className="form-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." required />
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Publish Resource</button>
                    </form>
                </div>
            )}

            {/* Resources Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {resources.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#6b7280', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                        No resources have been added to the library yet.
                    </div>
                ) : (
                    resources.map(res => (
                        <div
                            key={res.id}
                            onClick={() => setViewingResource(res)}
                            className="card animate-fade-in"
                            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer', background: '#fff', transition: 'transform 0.2s, box-shadow 0.2s' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {res.type === 'Image' ? <ImageIcon size={24} /> : (res.type === 'PDF' ? <File size={24} /> : <FileText size={24} />)}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ padding: '0.25rem 0.75rem', background: '#f3f4f6', color: '#4b5563', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {res.category}
                                    </span>
                                    {user.role === 'admin' && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (window.confirm(`Are you sure you want to delete "${res.title}"?`)) {
                                                    removeResource(res.id);
                                                }
                                            }}
                                            style={{ background: '#fee2e2', color: '#ef4444', padding: '0.4rem', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s', width: '30px', height: '30px' }}
                                            title="Delete resource"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem', lineHeight: '1.4' }}>{res.title}</h3>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                                <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 500 }}>{res.type} Format</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#2563eb', fontSize: '0.9rem', fontWeight: 600 }}>
                                    Open Document <ExternalLink size={14} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Resources;

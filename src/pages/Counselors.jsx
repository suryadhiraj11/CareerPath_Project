import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Star, Calendar as CalendarIcon, MessageCircle, Clock, CheckCircle, Plus, Mail, Trash2 } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Counselors = () => {
    const [bookingModal, setBookingModal] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    // New state for confirmation view
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [confirmedDetails, setConfirmedDetails] = useState(null);

    const [ratingModal, setRatingModal] = useState(null);
    const [selectedRating, setSelectedRating] = useState(0);

    const { counselors, user, bookSession, addCounselor, rateCounselor, removeCounselor } = useAppContext();

    const [showAddForm, setShowAddForm] = useState(false);
    const [newC, setNewC] = useState({ name: '', specialization: '', bio: '', availability: '', image: '' });

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

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate) return alert('Please select a date');
        if (!selectedTime) return alert('Please select a time');

        // bookSession expects: counselorId, counselorName, date, time, type
        const dateStr = selectedDate.toLocaleDateString();
        bookSession(bookingModal.id, bookingModal.name, dateStr, selectedTime, bookingModal.specialization);

        // Show confirmation screen instead of toast
        setConfirmedDetails({
            counselorName: bookingModal.name,
            counselorImage: bookingModal.image,
            date: dateStr,
            time: selectedTime,
            type: bookingModal.specialization
        });
        setBookingConfirmed(true);
    };

    const closeBookingFlow = () => {
        setBookingModal(null);
        setBookingConfirmed(false);
        setConfirmedDetails(null);
        setSelectedDate(null);
        setSelectedTime('');
    };

    const handleAddCounselor = (e) => {
        e.preventDefault();
        addCounselor({
            ...newC,
            image: newC.image || `https://i.pravatar.cc/150?u=${newC.name.replace(/\s+/g, '')}`,
            availability: newC.availability.split(',').map(s => s.trim())
        });
        alert('Counselor added successfully!');
        setShowAddForm(false);
        setNewC({ name: '', specialization: '', bio: '', availability: '', image: '' });
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '3rem 2rem' }}>

            {/* Dynamic Modal Layer */}
            {bookingModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>

                    {/* State 1: Booking Form */}
                    {!bookingConfirmed ? (
                        <div className="card animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px', background: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                                <img src={bookingModal.image} alt="Counselor" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#111827' }}>Book Session</h2>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>with {bookingModal.name}</p>
                                </div>
                            </div>

                            <form onSubmit={handleBookingSubmit}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', color: '#111827' }}>
                                        Select Date
                                    </label>
                                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>Usually available: {bookingModal.availability.join(', ')}</p>
                                    <div style={{ width: '100%', color: 'black' }}>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => setSelectedDate(date)}
                                            className="form-input"
                                            minDate={new Date()}
                                            placeholderText="Click to select a date"
                                            wrapperClassName="w-[100%]"
                                            style={{ width: '100%', color: 'black' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', color: '#111827' }}>
                                        Select Time
                                    </label>
                                    <select
                                        className="form-input"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Choose a time slot --</option>
                                        <option value="09:00 AM">09:00 AM</option>
                                        <option value="10:30 AM">10:30 AM</option>
                                        <option value="01:00 PM">01:00 PM</option>
                                        <option value="02:30 PM">02:30 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" onClick={closeBookingFlow} style={{ padding: '0.75rem', border: '1px solid #e5e7eb', background: '#fff', borderRadius: '8px', color: '#111827', fontWeight: 600, flex: 1, cursor: 'pointer' }}>
                                        Cancel
                                    </button>
                                    <button type="submit" style={{ padding: '0.75rem', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, flex: 2, cursor: 'pointer' }}>
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* State 2: High-Fi Success Confirmation */
                        <div className="card animate-fade-in" style={{ padding: '3rem 2.5rem', width: '100%', maxWidth: '450px', background: '#fff', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: '#f0fdf4', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <CheckCircle size={40} />
                            </div>

                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
                            <p style={{ color: '#4b5563', fontSize: '1rem', marginBottom: '2rem' }}>
                                Your career counseling session has been successfully scheduled.
                            </p>

                            {/* Receipt Card */}
                            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px dashed #d1d5db' }}>
                                    <img src={confirmedDetails.counselorImage} alt="Counselor" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                        <h4 style={{ fontWeight: 600, color: '#111827', margin: 0 }}>{confirmedDetails.counselorName}</h4>
                                        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>{confirmedDetails.type}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#6b7280', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CalendarIcon size={16} /> Date</span>
                                        <span style={{ fontWeight: 600, color: '#111827' }}>{confirmedDetails.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#6b7280', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> Time</span>
                                        <span style={{ fontWeight: 600, color: '#111827' }}>{confirmedDetails.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#6b7280', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> Notice</span>
                                        <span style={{ fontWeight: 600, color: '#2563eb', fontSize: '0.9rem' }}>Email sent</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={closeBookingFlow} style={{ width: '100%', padding: '0.85rem', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
                                Return to Directory
                            </button>
                        </div>
                    )}
                </div>
            )}


            {/* Rating Modal Layer */}
            {ratingModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div className="card animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px', background: '#fff', textAlign: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem' }}>
                            <img src={ratingModal.image} alt={ratingModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#111827' }}>Rate {ratingModal.name}</h2>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>How was your experience with this counselor?</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={36}
                                    fill={star <= selectedRating ? '#fbbf24' : 'transparent'}
                                    color={star <= selectedRating ? '#fbbf24' : '#d1d5db'}
                                    style={{ cursor: 'pointer', transition: 'all 0.2s', transform: star <= selectedRating ? 'scale(1.1)' : 'scale(1)' }}
                                    onClick={() => setSelectedRating(star)}
                                />
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="button" onClick={() => { setRatingModal(null); setSelectedRating(0); }} style={{ padding: '0.75rem', border: '1px solid #e5e7eb', background: '#fff', borderRadius: '8px', color: '#111827', fontWeight: 600, flex: 1, cursor: 'pointer' }}>
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedRating > 0) {
                                        rateCounselor(ratingModal.id, selectedRating);
                                        setRatingModal(null);
                                        setSelectedRating(0);
                                    }
                                }}
                                style={{ padding: '0.75rem', background: '#fbbf24', color: '#111827', border: 'none', borderRadius: '8px', fontWeight: 700, flex: 1, cursor: selectedRating > 0 ? 'pointer' : 'not-allowed', opacity: selectedRating > 0 ? 1 : 0.5 }}
                                disabled={selectedRating === 0}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Page Content */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>Counselors Directory</h1>
                    <p style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '600px' }}>Connect with seasoned professionals for personalized guidance.</p>
                </div>

                {user?.role === 'admin' && (
                    <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                        <Plus size={18} /> Add Counselor
                    </button>
                )}
            </div>

            {showAddForm && user?.role === 'admin' && (
                <div className="card animate-fade-in" style={{ padding: '2rem', marginBottom: '3rem', maxWidth: '600px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Counselor</h3>
                    <form onClick={e => e.stopPropagation()} onSubmit={handleAddCounselor}>
                        <div style={{ marginBottom: '1rem' }}>
                            <input type="text" className="form-input" placeholder="Full Name" value={newC.name} onChange={e => setNewC({ ...newC, name: e.target.value })} required />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <input type="text" className="form-input" placeholder="Specialization (e.g. Finance)" value={newC.specialization} onChange={e => setNewC({ ...newC, specialization: e.target.value })} required />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <input type="text" className="form-input" placeholder="Availability (e.g. Mon, Wed, Fri)" value={newC.availability} onChange={e => setNewC({ ...newC, availability: e.target.value })} required />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 600 }}>Counselor Photo Upload (Optional)</label>
                            <input type="file" accept="image/*" className="form-input" onChange={handleImageUpload} style={{ padding: '0.45rem', background: '#fff' }} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <textarea className="form-input" placeholder="Short Bio" rows="3" value={newC.bio} onChange={e => setNewC({ ...newC, bio: e.target.value })} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Counselor Profile</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {counselors.map((counselor, index) => (
                    <div key={counselor.id} className="card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>

                        {user?.role === 'admin' && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm(`Are you sure you want to permanently remove counselor "${counselor.name}"?`)) {
                                        removeCounselor(counselor.id);
                                    }
                                }}
                                style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#fee2e2', color: '#ef4444', padding: '0.4rem', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s', width: '30px', height: '30px' }}
                                title="Delete counselor"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'center' }}>
                            <img src={counselor.image} alt={counselor.name} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>{counselor.name}</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>{counselor.specialization}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>
                                    <Star size={14} fill="currentColor" />
                                    <span>{counselor.rating}</span>
                                    <span style={{ color: '#9ca3af', marginLeft: '0.25rem', fontWeight: 400 }}>({counselor.reviews})</span>
                                </div>
                            </div>
                        </div>

                        <p style={{ color: '#4b5563', fontSize: '0.95rem', flex: 1, marginBottom: '1.5rem', lineHeight: '1.5' }}>"{counselor.bio}"</p>

                        <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111827', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                <CalendarIcon size={16} style={{ color: '#2563eb' }} />
                                <span style={{ fontWeight: 600 }}>Working Days:</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {counselor.availability.map(day => (
                                    <span key={day} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontWeight: 500 }}>{day}</span>
                                ))}
                            </div>
                        </div>

                        {user?.role === 'student' && (
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1, padding: '0.75rem', fontSize: '0.95rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', border: '1px solid #e5e7eb' }}
                                    onClick={() => setRatingModal(counselor)}
                                >
                                    <Star size={16} fill="#fbbf24" color="#fbbf24" /> Rate
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1.5, padding: '0.75rem', fontSize: '0.95rem' }}
                                    onClick={() => setBookingModal(counselor)}
                                >
                                    Book Session <Clock size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Counselors;

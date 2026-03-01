import React, { useState } from 'react';
import { assessmentQuestions } from '../data';
import { useAppContext } from '../context/AppContext';
import { BrainCircuit, CheckCircle, ArrowRight, RefreshCcw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CareerAssessment = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const { careers, completeAssessment } = useAppContext();
    const navigate = useNavigate();

    const handleSelect = (category) => {
        const newAnswers = { ...answers, [currentStep]: category };
        setAnswers(newAnswers);

        if (currentStep < assessmentQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);

            // Calculate and log completion
            const tallies = Object.values(newAnswers).reduce((acc, cat) => {
                acc[cat] = (acc[cat] || 0) + 1;
                return acc;
            }, {});
            const topCategory = Object.keys(tallies).reduce((a, b) => tallies[a] > tallies[b] ? a : b);
            completeAssessment(topCategory);
        }
    };

    const calculateResult = () => {
        const tallies = Object.values(answers).reduce((acc, cat) => {
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});

        const topCategory = Object.keys(tallies).reduce((a, b) => tallies[a] > tallies[b] ? a : b);
        return careers.filter(c => c.category === topCategory);
    };

    const restart = () => {
        setCurrentStep(0);
        setAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const recommendedCareers = calculateResult();
        const topCategory = recommendedCareers[0]?.category;

        return (
            <div className="container animate-fade-in" style={{ paddingBottom: '4rem', maxWidth: '800px' }}>
                <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '1.5rem' }}>
                        <Sparkles size={40} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Assessment Complete!</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Based on your responses, you show a strong aptitude for <strong className="text-gradient" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{topCategory}</strong> related roles.
                    </p>

                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'left', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>Your Top Matches</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', marginBottom: '3rem' }}>
                        {recommendedCareers.slice(0, 3).map((career, i) => (
                            <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{career.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{career.description}</p>
                                </div>
                                <button className="btn btn-primary" onClick={() => navigate('/careers')} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    Explore <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="btn btn-secondary" onClick={restart}>
                        <RefreshCcw size={18} /> Take Assessment Again
                    </button>
                </div>
            </div>
        );
    }

    const question = assessmentQuestions[currentStep];
    const progress = ((currentStep) / assessmentQuestions.length) * 100;

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '4rem', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Career Assessment Profile</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Discover paths that align with your natural strengths and interests.</p>
            </div>

            <div className="glass" style={{ padding: '3rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <span>Question {currentStep + 1} of {assessmentQuestions.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--gradient-primary)', transition: 'width 0.3s ease' }}></div>
                    </div>
                </div>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <BrainCircuit className="text-gradient" size={28} style={{ flexShrink: 0, marginTop: '4px' }} />
                    {question.question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {question.options.map((opt, i) => (
                        <button
                            key={i}
                            className="btn text-left"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', padding: '1.25rem', justifyContent: 'flex-start', fontSize: '1rem', color: 'var(--text-primary)', textAlign: 'left', borderRadius: '12px' }}
                            onClick={() => handleSelect(opt.category)}
                        >
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--text-secondary)', marginRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            </div>
                            <span>{opt.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerAssessment;

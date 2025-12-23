import { useState, useEffect } from 'react';
import axios from 'axios';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ role: '', company: '', period: '', description: '' });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await axios.get('/api/experience');
            setExperiences(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('role', formData.role);
        data.append('company', formData.company);
        data.append('period', formData.period);
        data.append('description', formData.description);
        if (file) data.append('logo', file);

        try {
            await axios.post('/api/experience', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Experience added!');
            setFormData({ role: '', company: '', period: '', description: '' });
            setFile(null);
            fetchExperiences();
        } catch (err) {
            setMessage('Failed to add experience.');
        }
    };

    return (
        <section className="section bg-light">
            <div className="container" style={{ paddingBottom: '2rem' }}>
                <h2 className="section-title">My Experience</h2>

                {loading ? <p>Loading...</p> : (
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {experiences.length === 0 ? <p className="text-center">No experience added yet.</p> : experiences.map((exp, index) => (
                            <div key={exp._id} style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                gap: '3rem',
                                marginBottom: '4rem',
                                padding: '2rem',
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                            }}>
                                {/* Logo/Image Section */}
                                <div style={{ flex: '0 0 200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {exp.logoUrl ? (
                                        <img
                                            src={`http://localhost:5000${exp.logoUrl}`}
                                            alt={exp.company}
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'contain',
                                                borderRadius: '12px',
                                                padding: '10px',
                                                backgroundColor: '#f8f9fa'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '150px',
                                            height: '150px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#e9ecef',
                                            borderRadius: '12px',
                                            color: '#6c757d',
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem'
                                        }}>
                                            {exp.company.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div style={{ flex: '1 1 400px' }}>
                                    <h3 style={{
                                        color: 'var(--primary-color)',
                                        fontSize: '1.8rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {exp.role}
                                    </h3>
                                    <p style={{
                                        fontSize: '1.2rem',
                                        color: '#6c757d',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600'
                                    }}>
                                        {exp.company}
                                    </p>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#999',
                                        marginBottom: '1rem',
                                        fontStyle: 'italic'
                                    }}>
                                        {exp.period}
                                    </p>
                                    <p style={{
                                        fontSize: '1rem',
                                        lineHeight: '1.7',
                                        color: '#555'
                                    }}>
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Experience Form - Only for Logged In Users */}
            {token && (
                <div className="container" style={{ marginTop: '4rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
                    <div className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Experience</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Role / Position</label>
                                    <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required placeholder="e.g. Software Engineer" />
                                </div>
                                <div className="form-group">
                                    <label>Company / Organization</label>
                                    <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required placeholder="e.g. Google" />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Period</label>
                                    <input type="text" value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} required placeholder="e.g. 2023 - Present" />
                                </div>
                                <div className="form-group">
                                    <label>Company Logo (Optional)</label>
                                    <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="4" required placeholder="Describe your role and responsibilities..."></textarea>
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%' }}>Add Experience</button>
                            {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Experience;

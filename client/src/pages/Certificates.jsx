import { useState, useEffect } from 'react';
import axios from 'axios';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        year: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch Certificates
    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const res = await axios.get('/api/certificates');
            setCertificates(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching certificates", err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('issuer', formData.issuer);
        data.append('year', formData.year);
        data.append('description', formData.description);
        data.append('image', file);

        try {
            setMessage("Uploading...");
            await axios.post('/api/certificates', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage("Certificate Uploaded Successfully!");
            setFormData({ title: '', issuer: '', year: '', description: '' });
            setFile(null);
            // Reset file input manually if needed, or rely on state. 
            // Ideally, we'd clear the input ref, but state null is a start for logic.
            fetchCertificates();
        } catch (err) {
            console.error(err);
            setMessage("Failed to upload certificate.");
        }
    };

    return (
        <section className="section container">
            <h2 className="section-title">Certificates</h2>

            {/* Certificates Grid */}
            {loading ? <p>Loading certificates...</p> : (
                <div className="premium-grid" style={{ minHeight: '200px' }}>
                    {certificates.length === 0 ? <p className="text-center">No certificates found.</p> : certificates.map(cert => (
                        <div key={cert._id} className="premium-card">
                            <div className="premium-card-front">
                                <div className="card-image-container">
                                    {cert.fileUrl ? (
                                        <img
                                            src={`https://mern-stack-portfolio-backend-gs5k.onrender.com/${cert.fileUrl}`}
                                            alt={cert.title}
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=No+Preview'; }}
                                        />
                                    ) : (
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>No Preview</div>
                                    )}
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{cert.title}</h3>
                                    <p className="card-subtitle">{cert.issuer} | {cert.year}</p>
                                </div>
                            </div>
                            <div className="premium-overlay">
                                <h3 style={{ marginBottom: '1rem' }}>{cert.title}</h3>
                                <p className="overlay-description">{cert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Form - Moved Before Footer (Only for Logged In Users) */}
            {token && (
                <div className="container" style={{ marginTop: '4rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
                    <div className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Add New Certificate</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Certificate Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Issuer / Organization</label>
                                    <input type="text" name="issuer" value={formData.issuer} onChange={handleInputChange} required />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Year</label>
                                    <input type="text" name="year" value={formData.year} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Certificate Image / File</label>
                                    <input type="file" onChange={handleFileChange} accept="image/*, application/pdf" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} required></textarea>
                            </div>

                            <button type="submit" className="btn" style={{ width: '100%' }}>Upload Certificate</button>
                            {message && <p style={{ marginTop: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certificates;

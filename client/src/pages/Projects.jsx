import { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', description: '', technologies: '', link: '', liveLink: '' });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            setProjects(res.data);
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
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('technologies', formData.technologies);
        data.append('link', formData.link);
        data.append('liveLink', formData.liveLink);
        if (file) data.append('image', file);

        console.log('Sending project data:', Object.fromEntries(data.entries()));

        try {
            await axios.post('/api/projects', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Project added!');
            setFormData({ title: '', description: '', technologies: '', link: '', liveLink: '' });
            setFile(null);
            fetchProjects();
        } catch (err) {
            setMessage('Failed to add project.');
        }
    };

    return (
        <section className="section bg-light">
            <div className="container" style={{ paddingBottom: '2rem' }}>
                <h2 className="section-title">My Projects</h2>

                {loading ? <p>Loading...</p> : (
                    <div className="premium-grid">
                        {projects.length === 0 ? <p>No projects added yet.</p> : projects.map(proj => (
                            <div key={proj._id} className="premium-card">
                                <div className="premium-card-front">
                                    <div className="card-image-container">
                                        {proj.fileUrl ? (
                                            <img
                                                src={`https://mern-stack-portfolio-backend-gs5k.onrender.com/${proj.fileUrl}`}
                                                alt={proj.title}
                                            />
                                        ) : (
                                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9ecef', color: '#888' }}>
                                                No Preview
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">{proj.title}</h3>
                                        <p className="card-subtitle" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {proj.technologies}
                                        </p>
                                    </div>
                                </div>
                                <div className="premium-overlay">
                                    <h3 style={{ marginBottom: '0.5rem' }}>{proj.title}</h3>
                                    <p className="overlay-description" style={{ maxHeight: '100px', overflowY: 'auto' }}>{proj.description}</p>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                                                Details
                                            </a>
                                        )}
                                        {proj.liveLink && (
                                            <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="overlay-btn" style={{ background: 'white', color: 'var(--primary-color)' }}>
                                                View
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Project Form - Only for Logged In Users */}
            {token && (
                <div className="container" style={{ marginTop: '4rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
                    <div className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Project</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Project Title</label>
                                    <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Technologies (comma separated)</label>
                                    <input type="text" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} placeholder="React, Node, MongoDB" required />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Code Link (e.g. GitHub)</label>
                                    <input type="url" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} placeholder="https://github.com/..." />
                                </div>
                                <div className="form-group">
                                    <label>Live Project Link (Optional)</label>
                                    <input type="url" value={formData.liveLink} onChange={e => setFormData({ ...formData, liveLink: e.target.value })} placeholder="https://your-project.com" />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label>Project Image</label>
                                    <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" style={{ border: '1px solid #ddd', padding: '0.5rem', width: '100%', borderRadius: '8px' }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="3" required></textarea>
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%' }}>Add Project</button>
                            {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;

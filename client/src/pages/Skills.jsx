import { useState, useEffect } from 'react';
import axios from 'axios';
const API = "https://mern-stack-portfolio-backend-gs5k.onrender.com";

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', level: '', description: '', category: 'Programming Languages' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await axios.get('${API}/api/skills');
            setSkills(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/skills', formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMessage('Skill added!');
            setFormData({ name: '', level: '', description: '', category: 'Programming Languages' });
            fetchSkills();
        } catch (err) {
            setMessage('Failed to add skill.');
        }
    };

    return (
        <section className="section gradient-bg">
            <div className="container" style={{ paddingBottom: '2rem' }}>
                <h2 className="section-title">My Technical Skills</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                    Technologies and tools I work with
                </p>

                {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
                    <>
                        {skills.length === 0 ? (
                            <p className="text-center">No skills added yet.</p>
                        ) : (
                            <>
                                {/* Group skills by category */}
                                {[
                                    'Programming Languages',
                                    'Frontend',
                                    'Backend',
                                    'Database',
                                    'DevOps/Containerization',
                                    'Version Control',
                                    'Automation Tools',
                                    'Core CS Fundamentals',
                                    'Data Science & AI',
                                    'Tools',
                                    'Other'
                                ].map(category => {
                                    const categorySkills = skills.filter(skill => skill.category === category);

                                    if (categorySkills.length === 0) return null;

                                    // Category icons
                                    const categoryIcons = {
                                        'Programming Languages': 'bx-code-curly',
                                        'Frontend': 'bx-code-alt',
                                        'Backend': 'bx-server',
                                        'Database': 'bx-data',
                                        'DevOps/Containerization': 'bxl-docker',
                                        'Version Control': 'bxl-git',
                                        'Automation Tools': 'bx-bot',
                                        'Core CS Fundamentals': 'bx-chip',
                                        'Data Science & AI': 'bx-brain',
                                        'Tools': 'bx-wrench',
                                        'Other': 'bx-layer'
                                    };

                                    // Category colors - vibrant gradients
                                    const categoryColors = {
                                        'Programming Languages': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        'Frontend': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        'Backend': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                        'Database': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                                        'DevOps/Containerization': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                        'Version Control': 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
                                        'Automation Tools': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                        'Core CS Fundamentals': 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
                                        'Data Science & AI': 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
                                        'Tools': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                        'Other': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                                    };

                                    return (
                                        <div key={category} style={{ marginBottom: '3rem' }}>
                                            {/* Category Header */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                marginBottom: '1.5rem',
                                                paddingBottom: '0.75rem',
                                                borderBottom: '2px solid rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '12px',
                                                    background: categoryColors[category],
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                                                }}>
                                                    <i className={`bx ${categoryIcons[category]}`} style={{ fontSize: '1.8rem', color: 'white' }}></i>
                                                </div>
                                                <h3 style={{
                                                    fontSize: '1.8rem',
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    margin: 0
                                                }}>
                                                    {category}
                                                </h3>
                                                <span style={{
                                                    marginLeft: 'auto',
                                                    padding: '0.25rem 0.75rem',
                                                    background: 'white',
                                                    borderRadius: '20px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    color: 'var(--text-muted)',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                }}>
                                                    {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                                                </span>
                                            </div>

                                            {/* Skills Grid for this category */}
                                            <div className="premium-grid">
                                                {categorySkills.map(skill => (
                                                    <div key={skill._id} className="premium-card skill-card">
                                                        <div className="premium-card-front">
                                                            <div className="card-content">
                                                                <div className="card-title">{skill.name}</div>
                                                                <div className="card-subtitle">{skill.category}</div>
                                                                <div className="skill-level-bar">
                                                                    <div className="skill-level-fill" style={{ width: skill.level }}></div>
                                                                </div>
                                                                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
                                                                    {skill.level} Proficiency
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="premium-overlay">
                                                            <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
                                                                {skill.name}
                                                            </h3>
                                                            <p className="overlay-description">
                                                                {skill.description || `Experienced in ${skill.name} with a proficiency of ${skill.level}.`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Add Skill Form - Only for Logged In Users */}
            {token && (
                <div className="container" style={{ marginTop: '4rem', borderTop: '1px solid #ddd', paddingTop: '2rem' }}>
                    <div className="contact-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Add New Skill</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Skill Name</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g. React" />
                            </div>
                            <div className="form-group">
                                <label>Proficiency Level (e.g. 50%, 90%)</label>
                                <input type="text" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} required placeholder="e.g. 85%" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="Programming Languages">Programming Languages</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Database">Database</option>
                                    <option value="DevOps/Containerization">DevOps/Containerization</option>
                                    <option value="Version Control">Version Control</option>
                                    <option value="Automation Tools">Automation Tools</option>
                                    <option value="Core CS Fundamentals">Core CS Fundamentals</option>
                                    <option value="Data Science & AI">Data Science & AI</option>
                                    <option value="Tools">Tools</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="3" required></textarea>
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%' }}>Add Skill</button>
                            {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Skills;

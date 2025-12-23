import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        aboutBio: '',
        email: '',
        phone: '',
        githubLink: '',
        linkedinLink: '',
        instagramLink: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('/api/profile');
            if (res.data) {
                setFormData({
                    name: res.data.name || '',
                    tagline: res.data.tagline || '',
                    aboutBio: res.data.aboutBio || '',
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    githubLink: res.data.githubLink || '',
                    linkedinLink: res.data.linkedinLink || '',
                    instagramLink: res.data.instagramLink || ''
                });
                if (res.data.profileImageUrl) {
                    setPreviewImage(`http://localhost:5000${res.data.profileImageUrl}`);
                }
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching profile", err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (profileImage) data.append('profileImage', profileImage);
        if (resume) data.append('resume', resume);

        try {
            setMessage('Saving...');
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Profile Saved Successfully!');
            if (res.data.profileImageUrl) {
                setPreviewImage(`http://localhost:5000${res.data.profileImageUrl}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Failed to save profile.');
        }
    };

    if (loading) return <div className="container section">Loading Profile...</div>;

    return (
        <section className="section container">
            <h2 className="section-title">Profile Data Settings</h2>

            <div className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {/* Image Preview */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#ddd', border: '4px solid var(--primary-color)' }}>
                            {previewImage ? (
                                <img src={previewImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>No Image</div>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Tagline / Title</label>
                            <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} placeholder="e.g. Full Stack Developer" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Short Bio (Used in About Me)</label>
                        <textarea name="aboutBio" rows="4" value={formData.aboutBio} onChange={handleInputChange}></textarea>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                    </div>

                    <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>Social Links</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>LinkedIn URL</label>
                            <input type="text" name="linkedinLink" value={formData.linkedinLink} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input type="text" name="githubLink" value={formData.githubLink} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Instagram URL</label>
                            <input type="text" name="instagramLink" value={formData.instagramLink} onChange={handleInputChange} />
                        </div>
                    </div>

                    <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>Uploads</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Profile Image</label>
                            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label>Resume (PDF)</label>
                            <input type="file" onChange={(e) => setResume(e.target.files[0])} accept="application/pdf" />
                        </div>
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Save Profile Data</button>
                    {message && <p style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>}
                </form>
            </div>
        </section>
    );
};

export default ProfileSettings;

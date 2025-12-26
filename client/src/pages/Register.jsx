import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API = "https://mern-stack-portfolio-backend-gs5k.onrender.com";
const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('${API}/api/register', formData);
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <section className="section container">
            <h2 className="section-title">Register</h2>
            <div className="contact-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Register</button>
                    {message && <p style={{ color: message.includes('success') ? 'green' : 'red', textAlign: 'center', marginTop: '1rem' }}>{message}</p>}
                </form>
            </div>
        </section>
    );
};

export default Register;

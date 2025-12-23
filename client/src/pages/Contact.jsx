import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            await axios.post('/api/contact', formData);
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (
        <section className="section gradient-bg" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get In Touch</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                    Have a question or want to work together? I'd love to hear from you!
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'stretch' }}>

                    {/* Left Column: Contact Info Cards */}
                    <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Email Card */}
                        <div className="premium-card-container" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'var(--primary-gradient)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <i className='bx bx-envelope' style={{ fontSize: '2rem', color: 'white' }}></i>
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '0.25rem' }}>Email</h4>
                                    <a href="mailto:balamurugankumar880@gmail.com" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.95rem' }}>
                                        balamurugankumar880@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="premium-card-container" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'var(--primary-gradient)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <i className='bx bx-phone' style={{ fontSize: '2rem', color: 'white' }}></i>
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '0.25rem' }}>Phone</h4>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>+91 9500334590</p>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>+91 9944939560</p>
                                </div>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="premium-card-container" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'var(--primary-gradient)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <i className='bx bx-map' style={{ fontSize: '2rem', color: 'white' }}></i>
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '0.25rem' }}>Location</h4>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Aruppukkottai, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="premium-card-container" style={{ padding: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: 'var(--text-color)' }}>Connect With Me</h4>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <a href="https://github.com/DevilDeath07" target="_blank" rel="noopener noreferrer" style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'var(--transition-fast)',
                                    textDecoration: 'none'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-gradient)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}>
                                    <i className='bx bxl-github' style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}></i>
                                </a>
                                <a href="https://www.linkedin.com/in/balamurugan-v-16471828b/" target="_blank" rel="noopener noreferrer" style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'var(--transition-fast)',
                                    textDecoration: 'none'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-gradient)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}>
                                    <i className='bx bxl-linkedin' style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}></i>
                                </a>
                                <a href="https://www.instagram.com/conquiror_of_death/" target="_blank" rel="noopener noreferrer" style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'var(--transition-fast)',
                                    textDecoration: 'none'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-gradient)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}>
                                    <i className='bx bxl-instagram' style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div style={{ flex: '1 1 500px' }}>
                        <div className="premium-card-container">
                            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: 'bold' }}>Send Me a Message</h3>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-color)' }}>
                                        <i className='bx bx-user' style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}></i>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: 'var(--border-radius)',
                                            border: '2px solid #e9ecef',
                                            backgroundColor: '#f8f9fa',
                                            fontSize: '1rem',
                                            transition: 'var(--transition-fast)',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-color)' }}>
                                        <i className='bx bx-envelope' style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}></i>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: 'var(--border-radius)',
                                            border: '2px solid #e9ecef',
                                            backgroundColor: '#f8f9fa',
                                            fontSize: '1rem',
                                            transition: 'var(--transition-fast)',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-color)' }}>
                                        <i className='bx bx-message-detail' style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}></i>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="How can I help you?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: 'var(--border-radius)',
                                            border: '2px solid #e9ecef',
                                            backgroundColor: '#f8f9fa',
                                            fontSize: '1rem',
                                            transition: 'var(--transition-fast)',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-color)' }}>
                                        <i className='bx bx-message-dots' style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}></i>
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Your message here..."
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            borderRadius: 'var(--border-radius)',
                                            border: '2px solid #e9ecef',
                                            backgroundColor: '#f8f9fa',
                                            fontSize: '1rem',
                                            resize: 'vertical',
                                            transition: 'var(--transition-fast)',
                                            outline: 'none',
                                            fontFamily: 'inherit'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'var(--primary-gradient)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--border-radius)',
                                        fontWeight: 'bold',
                                        fontSize: '1.05rem',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <i className='bx bx-send'></i>
                                    Send Message
                                </button>
                                {status && (
                                    <div style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--border-radius)',
                                        textAlign: 'center',
                                        fontWeight: '500',
                                        background: status.includes('success') ? '#d4edda' : '#f8d7da',
                                        color: status.includes('success') ? '#155724' : '#721c24',
                                        border: `1px solid ${status.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
                                    }}>
                                        {status}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;

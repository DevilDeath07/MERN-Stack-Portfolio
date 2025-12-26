import { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/profile');
                setProfile(res.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };
        fetchProfile();
    }, []);

    // Default values
    const name = "Balamurugan V";
    const location = "Aruppukkottai, India";
    const phone = "+91 9500334590, +91 9944939560";
    const email = "balamurugankumar880@gmail.com";
    const dob = "02-07-2006";
    const profileImg = (profile?.profileImageUrl && `https://mern-stack-portfolio-backend-gs5k.onrender.com/${profile.profileImageUrl}`) || "/profile-pic.jpg";
    const resumeUrl = (profile?.resumeUrl && `https://mern-stack-portfolio-backend-gs5k.onrender.com/${profile.resumeUrl}`) || "#";

    const cardStyle = {
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };

    const iconStyle = {
        fontSize: '1.2rem',
        marginRight: '0.75rem',
        color: 'var(--primary-color)',
    };

    return (
        <section className="section" style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh',
            padding: '4rem 2rem'
        }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>

                {/* Hero Card - Profile */}
                <div style={{
                    ...cardStyle,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}>
                    {/* Decorative gradient overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '120px',
                        background: 'linear-gradient(135deg, rgba(46, 49, 146, 0.1) 0%, rgba(27, 255, 255, 0.1) 100%)',
                        zIndex: 0
                    }}></div>

                    {/* Profile Image */}
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'inline-block',
                        marginTop: '1rem'
                    }}>
                        <div style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '5px solid white',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                            margin: '0 auto'
                        }}>
                            <img src={profileImg} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>

                    {/* Name */}
                    <h1 style={{
                        color: 'var(--primary-color)',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        marginTop: '1.5rem',
                        marginBottom: '0.5rem',
                        position: 'relative',
                        zIndex: 1
                    }}>{name}</h1>

                    <p style={{
                        fontSize: '1.1rem',
                        color: '#6c757d',
                        marginBottom: '2rem',
                        fontStyle: 'italic'
                    }}>
                        Full Stack Developer | IT Student
                    </p>

                    {/* Contact Info Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem',
                        textAlign: 'left',
                        marginTop: '2rem'
                    }}>
                        <div style={{ padding: '0.75rem' }}>
                            <i className='bx bx-map' style={iconStyle}></i>
                            <span style={{ color: '#333' }}>{location}</span>
                        </div>
                        <div style={{ padding: '0.75rem' }}>
                            <i className='bx bx-envelope' style={iconStyle}></i>
                            <a href={`mailto:${email}`} style={{ color: '#333', textDecoration: 'none' }}>{email}</a>
                        </div>
                        <div style={{ padding: '0.75rem' }}>
                            <i className='bx bx-phone' style={iconStyle}></i>
                            <span style={{ color: '#333', fontSize: '0.9rem' }}>{phone}</span>
                        </div>
                        <div style={{ padding: '0.75rem' }}>
                            <i className='bx bx-cake' style={iconStyle}></i>
                            <span style={{ color: '#333' }}>{dob}</span>
                        </div>
                        <div style={{ padding: '0.75rem' }}>
                            <i className='bx bx-code-alt' style={iconStyle}></i>
                            <a href="https://leetcode.com/u/Balamurugan_V/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}>
                                LeetCode Profile
                            </a>
                        </div>
                    </div>
                </div>

                {/* Education Card */}
                <div style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}>
                    <h2 style={{
                        color: 'var(--primary-color)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <i className='bx bxs-graduation' style={{ fontSize: '2.2rem' }}></i>
                        Education
                    </h2>

                    {/* College */}
                    <div style={{
                        marginBottom: '2rem',
                        paddingLeft: '1rem',
                        borderLeft: '4px solid var(--primary-color)'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                            AAA College of Engineering and Technology
                        </h3>
                        <p style={{ color: '#6c757d', marginBottom: '0.25rem' }}>
                            <strong>B.Tech in Information Technology</strong> - 84.6%
                        </p>
                        <p style={{ color: '#999', fontSize: '0.9rem' }}>
                            <i className='bx bx-calendar' style={{ marginRight: '0.5rem' }}></i>
                            August 2024 - Present
                        </p>
                    </div>

                    {/* School */}
                    <div style={{
                        paddingLeft: '1rem',
                        borderLeft: '4px solid #6c757d'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                            Devangar Higher Secondary School
                        </h3>
                        <p style={{ color: '#6c757d', marginBottom: '0.25rem' }}>
                            <strong>12th - Computer Science</strong> - 75.83%
                        </p>
                        <p style={{ color: '#999', fontSize: '0.9rem' }}>
                            <i className='bx bx-calendar' style={{ marginRight: '0.5rem' }}></i>
                            June 2022 - March 2023
                        </p>
                    </div>
                </div>

                {/* Skills Card */}
                <div style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}>
                    <h2 style={{
                        color: 'var(--primary-color)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <i className='bx bx-code-block' style={{ fontSize: '2.2rem' }}></i>
                        Skills
                    </h2>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <h4 style={{ color: '#333', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                                <i className='bx bx-laptop' style={{ ...iconStyle, fontSize: '1.3rem' }}></i>
                                Technical Skills
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['HTML5', 'CSS3', 'Python', 'Java', 'C', 'C++', 'JavaScript', 'UX Design'].map(skill => (
                                    <span key={skill} style={{
                                        background: 'linear-gradient(135deg, rgba(46, 49, 146, 0.1) 0%, rgba(27, 255, 255, 0.1) 100%)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        color: '#333',
                                        fontWeight: '500',
                                        border: '1px solid rgba(46, 49, 146, 0.2)'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: '#333', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                                <i className='bx bx-group' style={{ ...iconStyle, fontSize: '1.3rem' }}></i>
                                Interpersonal Skills
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['Problem-Solving', 'Active Listening', 'Self-Discipline'].map(skill => (
                                    <span key={skill} style={{
                                        background: 'linear-gradient(135deg, rgba(46, 49, 146, 0.1) 0%, rgba(27, 255, 255, 0.1) 100%)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        color: '#333',
                                        fontWeight: '500',
                                        border: '1px solid rgba(46, 49, 146, 0.2)'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievements Card */}
                <div style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}>
                    <h2 style={{
                        color: 'var(--primary-color)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <i className='bx bx-trophy' style={{ fontSize: '2.2rem' }}></i>
                        Achievements & Certificates
                    </h2>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {[
                            { icon: 'bx-medal', text: 'Runner Up - UX Design Event', date: 'October 2024' },
                            { icon: 'bx-certification', text: 'Attendance Certificate - Red Hat', date: 'December 2024' },
                            { icon: 'bx-certification', text: 'Participation Certificate - Tamil Nadu Government & Mepco Schlenk', date: 'October 2024' },
                            { icon: 'bx-check-circle', text: 'Completion Certificate - be10X', date: 'December 2024' }
                        ].map((achievement, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                transition: 'background 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(46, 49, 146, 0.05) 0%, rgba(27, 255, 255, 0.05) 100%)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}>
                                <i className={`bx ${achievement.icon}`} style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontWeight: '500', color: '#333' }}>{achievement.text}</p>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#999' }}>{achievement.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interests Card */}
                <div style={cardStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    }}>
                    <h2 style={{
                        color: 'var(--primary-color)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <i className='bx bx-heart' style={{ fontSize: '2.2rem' }}></i>
                        Interests & Hobbies
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                        {[
                            { icon: 'bx-music', text: 'Music' },
                            { icon: 'bx-joystick', text: 'Gaming' },
                            { icon: 'bx-dish', text: 'Cooking' },
                            { icon: 'bx-puzzle', text: 'Puzzle Solving' },
                            { icon: 'bx-microphone', text: 'Singing' }
                        ].map((hobby, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1.5rem',
                                background: 'linear-gradient(135deg, rgba(46, 49, 146, 0.05) 0%, rgba(27, 255, 255, 0.05) 100%)',
                                borderRadius: '12px',
                                minWidth: '120px',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(46, 49, 146, 0.1) 0%, rgba(27, 255, 255, 0.1) 100%)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(46, 49, 146, 0.05) 0%, rgba(27, 255, 255, 0.05) 100%)';
                                }}>
                                <i className={`bx ${hobby.icon}`} style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}></i>
                                <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#333' }}>{hobby.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resume Download CTA */}
                <div style={{
                    ...cardStyle,
                    background: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
                    textAlign: 'center',
                    padding: '2.5rem'
                }}>
                    <h3 style={{
                        color: 'white',
                        fontSize: '1.8rem',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        Want to know more?
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        Download my complete resume
                    </p>
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: 'white',
                            color: 'var(--primary-color)',
                            padding: '1rem 2rem',
                            borderRadius: '30px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}
                    >
                        <i className='bx bx-download' style={{ fontSize: '1.5rem' }}></i>
                        Download Resume
                    </a>
                </div>

            </div>
        </section>
    );
};

export default About;

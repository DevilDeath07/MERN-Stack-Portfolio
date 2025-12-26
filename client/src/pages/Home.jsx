import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
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

    // Default values matching the image if dynamic data is missing
    const name = profile?.name || "Balamurugan";
    // Tagline from image: "an IT student. I am a Programmer, debugger, Software Developer, and Full Stack web developer."
    const bioText = profile?.aboutBio || "Hi! I'm Balamurugan, an IT student.\nI am a Programmer, debugger, Software Developer, and Full Stack web developer.";
    // Use the uploaded profile-pic.jpg as default
    const profileImg = (profile?.profileImageUrl && `https://mern-stack-portfolio-backend-gs5k.onrender.com/${profile.profileImageUrl}`) || "/profile-pic.jpg";

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1>Hi! I'm {name}</h1>
                    <p>{profile?.tagline || "Programmer | Full Stack Developer | IT Student"}</p>
                    <div className="cta-group">
                        <a href="/contact" className="btn">Get in Touch</a>
                        {profile?.resumeUrl ? (
                            <a href={`http://localhost:5000${profile.resumeUrl}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ marginLeft: '1rem', backgroundColor: 'var(--secondary-color)' }}>Download CV</a>
                        ) : (
                            <a href="#" className="btn" style={{ marginLeft: '1rem', backgroundColor: 'var(--secondary-color)' }}>Download CV</a>
                        )}
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="section" style={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9' }}>
                <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>

                    {/* Left Column: Image */}
                    <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                            <img src={profileImg} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
                        <h2 style={{ color: '#007bff', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>About Me</h2>

                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Hi, I'm <strong>Balamurugan V</strong> from Aruppukkottai, India. I'm currently pursuing my B.Tech in Information Technology at AAA College of Engineering and Technology, Virudhunagar. I’m passionate about technology and eager to start my career in the IT/ITES industry.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                I enjoy learning new technologies and applying them to real-world problems. My technical skills include HTML5, CSS3, Python, Java, C, C++, JavaScript, and UX Design. I'm also a strong problem solver and have good interpersonal skills like active listening and self-discipline.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                In my free time, I love music, gaming, cooking, solving puzzles, and singing. I'm constantly seeking new opportunities to grow and contribute to innovative projects.
                            </p>
                            <p>
                                Let’s connect: <a href="mailto:balamurugankumar880@gmail.com" style={{ color: 'blue', textDecoration: 'underline' }}>balamurugankumar880@gmail.com</a>
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Education Section */}
            <section className="section bg-light" style={{ padding: '4rem 2rem', borderTop: '1px solid #eee' }}>
                <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>

                    {/* Left Column: Content */}
                    <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
                        <h2 style={{ color: '#007bff', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Education</h2>

                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                            <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
                                I am currently pursuing my degree at <strong>AAACET</strong>.
                            </p>
                            <p>
                                <strong>Here are a few highlights:</strong><br />
                                Bachelor of Technology in Information Technology<br />
                                Expected Graduation: 2027
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Image (Logo) */}
                    <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/aaacet-logo.png" alt="AAACET Logo" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Home;

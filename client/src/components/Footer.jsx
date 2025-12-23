const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="icon">

          <a href="https://www.linkedin.com/in/balamurugan-v-16471828b/" target="_blank" rel="noreferrer">
            <i className="bx bxl-linkedin"></i> LinkedIn
          </a>
            
          <a href="https://github.com/DevilDeath07" target="_blank" rel="noreferrer">
            <i className="bx bxl-github"></i> GitHub
          </a>

          <a href="mailto:balamurugankumar880@gmail.com">
            <i className="bx bxl-gmail"></i> Email
          </a>

          <a href="tel:+919500334590">
            <i className="bx bx-phone"></i> +91 9500334590
          </a>

          <a href="https://www.instagram.com/conquiror_of_death/" target="_blank" rel="noreferrer">
            <i className="bx bxl-instagram"></i> Instagram
          </a>

        </div>

        <p>© {new Date().getFullYear()} Balamurugan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

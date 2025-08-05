import React from "react";
import "./footer.scss";
import logo from "../../assets/logo.png"; // Adjust the path to your logo

// MUI Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-section">
          <img src={logo} alt="Starlight Logo" className="footer__logo" />
          <p>Starlight is your gateway to endless entertainment — anytime, anywhere.</p>
        </div>

        <div className="footer__links">
          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="footer__social">
          <h4>Follow Us</h4>
          <div className="footer__icons">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Starlight Streaming. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

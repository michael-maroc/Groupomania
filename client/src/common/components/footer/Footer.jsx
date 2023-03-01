import youtubeIcon from "assets/youtube_icon.png";
import facebookicon from "assets/facebook_icon.png";
import githubIcon from "assets/github_icon.png";
import instagramIcon from "assets/instagram_icon.png";
import twitterIcon from "assets/twitter_icon.png";
import './footer.css';
import { Link } from "react-router-dom";
import { getCurrentToken } from "features/auth/authSlice";
import { useSelector } from "react-redux";

const Footer = () => {
  const token = useSelector(getCurrentToken);

  return token ? (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-rows-container">
          <div className="contacts-box">
            <h1 className="row-top-title">Contacts</h1>
            <h2 className="row-title">Address:</h2>
            <span>19 Quai de la Charente 75019, Paris, France</span>

            <h2 className="row-title">Email:</h2>
            <span>groupomania@email.com</span>

            <h2 className="row-title">Phone:</h2>
            <span>+1 202-918-2132</span>
          </div>
          <div className="links-box">
            <h1 className="row-top-title">Links</h1>
            <span>About</span>
            <span>Contacts</span>
            <span>Team</span>
            <span>Company</span>
          </div>

          <div className="social-medias-links-box">
            <h1 className="row-top-title">Follow us</h1>
            <div className="social-medias-links">
              <Link to="https://facebook.com" aria-label="link to facebook" target="_blank" >
                <img src={facebookicon} alt="facebook icon" />
              </Link>
              <Link to="https://instagram.com" aria-label="link to instagram" target="_blank" >
                <img src={instagramIcon} alt="facebook icon" />
              </Link>
              <Link to="https://twitter.com" aria-label="link to twitter" target="_blank" >
                <img src={twitterIcon} alt="facebook icon" />
              </Link>
              <Link to="https://youtube.com" aria-label="link to youtube" target="_blank" >
                <img src={youtubeIcon} alt="facebook icon" />
              </Link>
              <Link to="https://github.com" aria-label="link to github" target="_blank" >
                <img src={githubIcon} alt="facebook icon" />
              </Link>
            </div>
          </div>
        </div>
          <span className="copyrights">© 2023 Groupomania - All Rights Reserved.</span>
      </div>
    </footer>
  ) : null
};

export default Footer;
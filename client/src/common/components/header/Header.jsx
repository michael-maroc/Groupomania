import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowRightFromBracket, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSendLogoutMutation } from "features/auth/authApiSlice";
import "./header.css";
import NavLogo from "../NavLogo";

const Header = () => {
  const [sendLogout] = useSendLogoutMutation();

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-logo-container">
          <Link to="/home" aria-label="link to the home page"><NavLogo className="nav-logo" /></Link>
        </div>
        <ul>
          {/* Pc screen part */}
          <li className="nav-full-size"><Link to="/home" aria-label="link to the home page">Home</Link></li>
          <li className="nav-full-size"><Link to="/profile" aria-label="link to the profile page">Profile</Link></li>
          <li className="nav-full-size"><Link onClick={sendLogout} aria-label="disconnect button">Logout</Link></li>
  
          {/* Responsive part */}
          <li className="nav-small-size">
            <p>Home</p>
            <Link to="/home" aria-label="link to the home page"><FontAwesomeIcon icon={faHome} /></Link>
          </li>
  
          <li className="nav-small-size">
            <p>Profile</p>
            <Link to="/profile" aria-label="link to the profile page"><FontAwesomeIcon icon={faUserPen} /></Link>
          </li>
          
          <li className="nav-small-size">
            <p>Logout</p>
            <Link onClick={sendLogout} aria-label="disconnect button"><FontAwesomeIcon icon={faArrowRightFromBracket} /></Link>
          </li>
        </ul>
      </nav>
    </header>
    );
};

export default Header;

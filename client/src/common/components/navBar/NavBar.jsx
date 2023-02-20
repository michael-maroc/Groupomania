import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowRightFromBracket, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSendLogoutMutation } from "features/auth/authApiSlice";
import { getCurrentToken } from "features/auth/authSlice";
import "./navBar.scss";
import NavLogo from "../NavLogo";

const NavBar = () => {
  const [sendLogout] = useSendLogoutMutation();
  const token = useSelector(getCurrentToken);

  return token ? (
    <nav className="nav">
      <div className="logo-container">
        <NavLogo className="nav-logo" />
      </div>
      <ul>
        <li className="nav-full-size"><Link to="/home">Home</Link></li>
        <li className="nav-full-size"><Link to="/profile">Profile</Link></li>
        <li className="nav-full-size"><Link onClick={sendLogout}>Logout</Link></li>

        {/* Responsive part */}
        <li className="nav-small-size">
          <p>Home</p>
          <Link to="/home"><FontAwesomeIcon icon={faHome} /></Link>
        </li>
        <li className="nav-small-size">
          <p>Profile</p>
          <Link to="/profile"><FontAwesomeIcon icon={faUserPen} /></Link>
        </li>
        <li className="nav-small-size">
          <p>Logout</p>
          <Link onClick={sendLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></Link>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default NavBar;

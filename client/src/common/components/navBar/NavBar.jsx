import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faFileImage, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSendLogoutMutation } from "../../../features/auth/authApiSlice";
import { getCurrentToken } from "../../../features/auth/authSlice";
import Logo from "/images/icon-left-font-monochrome-white.svg";
import "./navBar.scss";

const NavBar = () => {
  const [sendLogout] = useSendLogoutMutation();
  const token = useSelector(getCurrentToken);

  return token ? (
    <nav className="nav">
      <img className="nav-logo" src={Logo} alt="Logo" />
      <ul>
        <li className="nav-full-size"><Link to="/home">Home</Link></li>
        <li className="nav-full-size"><Link to="/profile">Profile</Link></li>
        <li className="nav-full-size"><Link onClick={sendLogout}>Logout</Link></li>

        <li className="nav-small-size">
          <p>Home</p>
          <Link to="/home"><FontAwesomeIcon icon={faHome} /></Link>
        </li>
        <li className="nav-small-size">
          <p>Profile</p>
          <Link to="/profile"><FontAwesomeIcon icon={faFileImage} /></Link>
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

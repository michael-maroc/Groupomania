import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSendLogoutMutation } from "../../../features/auth/authApiSlice";
import { getCurrentToken } from "../../../features/auth/authSlice";
import "./navBar.scss";

const NavBar = () => {
  const [sendLogout] = useSendLogoutMutation();
  const token = useSelector(getCurrentToken);

  return token ? (
    <nav className="home-nav">
      <h1>Beta test</h1>
      <ul>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link onClick={sendLogout}>Logout</Link>
      </ul>
    </nav>
  ) : null;
};

export default NavBar;

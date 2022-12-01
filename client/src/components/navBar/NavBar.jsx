import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentToken, logout } from "../../features/auth/authSlice";
import "./navBar.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const token = useSelector(getCurrentToken);
  const handleLogout = dispatch(logout);

  return token ? (
    <nav className="home-nav">
      <h1>Beta test</h1>
      <ul>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </ul>
    </nav>
  ) : null;
};

export default NavBar;

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "./navBar.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const handleLogout = dispatch(logout);

  return (
    <nav className="home-nav">
      <h1>Beta test</h1>
      <ul>
        <Link to="/home">Home</Link>
        <Link to="/add-post">Create a post</Link>
        <Link to="/profile">Profile</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </ul>
    </nav>
  );
};

export default NavBar;

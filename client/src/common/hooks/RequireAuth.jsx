import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentToken } from "features/auth/authSlice";

const RequireAuth = () => {
  const token = useSelector(getCurrentToken);
  const location = useLocation();

  return token 
    ? <Outlet /> 
    : <Navigate to="/" state={{ from: location }} replace />
};

export default RequireAuth;

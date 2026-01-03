import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/Firebase";
import { logoutUser, selectGoogleUserDetails } from "../Redux/Auth/AuthSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleUserDetails = useSelector(selectGoogleUserDetails);

  const handleLogout = () => {
    localStorage.setItem("x-webbook-jwt-routes", null);
    dispatch(logoutUser());
    if (googleUserDetails) {
      auth.signOut();
    }
    navigate("/");
  };

  return { handleLogout };
};

export default useAuth;

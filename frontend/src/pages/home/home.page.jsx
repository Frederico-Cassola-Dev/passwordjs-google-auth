import Axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const HomePage = ({ isLogin, userName, userEmail, userImage }) => {
  const navigate = useNavigate();
  const logout = () => {
    Axios.get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    }).then(() => {
      navigate("/signup");
    });
  };
  return (
    <div>
      {isLogin ? (
        <div>
          <h1>{userName}</h1>
          <p>{userEmail}</p>
          {userImage && <img src={userImage} alt="User Image" />}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => navigate("/signup")}>LogIn</button>
      )}
    </div>
  );
};


HomePage.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
}
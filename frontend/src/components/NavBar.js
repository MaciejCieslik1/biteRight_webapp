import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../contexts/UserContext";
import { FaSignOutAlt } from "react-icons/fa";
import "./styles/NavBar.css";

const NavBar = ({
  showButtons = true,
  showLogoutButton = false,
  logoTarget = "/",
}) => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogoClick = () => {
    if (logoTarget) {
      navigate(logoTarget);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <button className="logo-button" onClick={handleLogoClick}>
        <img className="logo" src={logo} alt="Logo" />
      </button>
      {showButtons && (
        <div className="button-container">
          <button className="button login fade-in" onClick={handleLoginClick}>
            Login
          </button>
          <button
            className="button register fade-in"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      )}
      {showLogoutButton && (
        <div className="button-container">
          <button className="logout-btn" onClick={handleLogoutClick}>
            <div className="logout-text">Logout</div>
            <FaSignOutAlt />
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

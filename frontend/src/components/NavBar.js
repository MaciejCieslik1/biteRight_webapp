import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./NavBar.css";

const NavBar = ({ showButtons = true }) => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <nav className="navbar">
      <Link to="/home">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
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
    </nav>
  );
};

export default NavBar;

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
    <nav class="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      {showButtons && (
        <div class="button-container">
          <button class="button login" onClick={handleLoginClick}>
            Login
          </button>
          <button class="button register" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./NavBar.css";

const NavBar = ({ showButtons = true }) => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <nav class="navbar">
      <div class="logo-container">
        <img class="logo" src={logo} alt="Logo"></img>
      </div>
      {showButtons && (
        <div class="button-container">
          <button class="button login" onClick={handleLoginClick}>
            {" "}
            Login{" "}
          </button>
          <button class="button register"> Register </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

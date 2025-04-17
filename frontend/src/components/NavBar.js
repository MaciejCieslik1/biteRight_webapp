import React from "react";
import logo from "../assets/logo.png";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav class="navbar">
      <div class="logo-container">
        <img class="logo" src={logo} alt="Logo"></img>
      </div>
      <div class="button-container">
        <button class="login-button"> Login </button>
        <button class="register-button"> Register </button>
      </div>
    </nav>
  );
};

export default NavBar;

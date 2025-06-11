import React from "react";
import "./Footer.css";
import { FaHome, FaReadme, FaCog, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-buttons">
        <button
          className="footer-btn"
          title="Home"
          onClick={() => navigate("/home")}
        >
          <FaHome size={20} />
        </button>
        <button className="footer-btn" 
        title="Guide"
        onClick={() => navigate("/recipes")}
        >
          <FaReadme size={20} />
        </button>
        <button
          className="footer-btn"
          title="Progress"
          onClick={() => navigate("/progress")}
        >
          <FaChartLine size={20} />
        </button>
        <button
          className="footer-btn"
          title="Settings"
          onClick={() => navigate("/settings")}
        >
          <FaCog size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

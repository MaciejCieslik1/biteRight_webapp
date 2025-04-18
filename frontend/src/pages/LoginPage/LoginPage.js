import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./LoginPage.css";
import login_photo from "../../assets/login-photo.jpg";
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar showButtons={false} />
      <div className="login-page-container">
        <div className="login-container">
          <div className="login-form-container">
            <div className="login-form-header"> Login </div>
            <div className="login-form-body">
              <div className="login-form-field">
                <input
                  type="email"
                  className="login-form-input email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="login-form-field password">
                <input
                  type="password"
                  className="login-form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="register-text">
                Don't have an account yet? Register here
              </div>
            </div>
          </div>
          <div className="login-photo-container">
            <img className="login-photo" src={login_photo} alt="Yoghurt bowl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import register_photo from "../../assets/register-photo.jpg";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <div>
      <NavBar showButtons={false} />
      <div className="register-page-container">
        <div className="register-container">
          <div className="register-form-container">
            <div className="register-form-header"> Register </div>
            <div className="register-form-body">
              <div className="register-form-field">
                <input
                  type="email"
                  className="register-form-input email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="register-form-field">
                <input
                  type="username"
                  className="register-form-input username"
                  placeholder="Create a username"
                  required
                />
              </div>
              <div className="register-form-field password">
                <input
                  type="password"
                  className="register-form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="register-text">
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Login here
                </Link>
              </div>
            </div>
          </div>
          <div className="register-photo-container">
            <img
              className="register-photo"
              src={register_photo}
              alt="Yoghurt bowl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

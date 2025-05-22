import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import register_photo from "../../assets/register-photo.jpg";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      const text = await response.text();
      if (response.ok) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        setError(text);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <NavBar showButtons={false} />
      <div className="register-page-container">
        <div className="register-container">
          <div className="register-form-container">
            <div className="register-form-header slide-in"> Register </div>
            <div className="register-form-body fade-in">
              <div className="register-form-field">
                <input
                  type="email"
                  className="register-form-input email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-field">
                <input
                  type="username"
                  className="register-form-input username"
                  placeholder="Create a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="register-form-field password">
                <input
                  type="password"
                  className="register-form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="register-button-conatainer">
                <button className="register-button" onClick={handleRegister}>
                  Register
                </button>
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
              className="register-photo fade-in"
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

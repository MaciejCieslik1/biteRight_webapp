import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./LoginPage.css";
import login_photo from "../../assets/login-photo.jpg";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const text = await response.text();
      if (response.ok) {
        localStorage.setItem("jwt", text);
        const decodedUser = jwtDecode(text);
        setUser(decodedUser);
        navigate("/home");
      } else {
        setError(text);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(email, password);
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <NavBar showButtons={false} />
      <div className="login-page-container">
        <div className="login-container">
          <div className="login-form-container">
            <div className="login-form-header slide-in"> Login </div>
            <div className="login-form-body fade-in">
              <div className="login-form-field">
                <input
                  type="email"
                  className="login-form-input email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-field password">
                <input
                  type="password"
                  className="login-form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="login-button-container">
                <button className="login-button" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div className="register-text">
                Don't have an account yet?{" "}
                <Link to="/register" className="register-link">
                  Register here
                </Link>
                <br/>
                <Link to="/forgottenpasswordform" className="forgotten-password-link">
                    Forgot your password?
                </Link>
              </div>
            </div>
          </div>
          <div className="login-photo-container fade-in">
            <img className="login-photo" src={login_photo} alt="Yoghurt bowl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

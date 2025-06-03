import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import './ForgottenPasswordPage.css';


const FotgottenPasswordPage = () => {
    const [email, setEmail] = useState("");   
    
    const handleButton = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/forgottenpassword/${encodeURIComponent(email)}`, {
                method: "PUT",     
                }            
            );
            if (response.ok) {
                alert("Email sent. Please check your inbox.")
            }
            else {
            const text = await response.text();
                if (text) alert(text)
                else alert("An error occured.")
            }
        } catch (error) {
            alert("Invalid request.")
            console.error("Error:", error);
            console.log(email)
        }
    }

    return (
        <div className="page-container">
            <NavBar showButtons={false} />
                <div className="background-container slide-in">
                    <div className="form-container">
                        <div className="form ">
                            <div className="form-title ">
                                Reset Password
                            </div>
                            <div className="form-description">We will send an email to your inbox and then just follow that link to set your new password</div>
                            <div className="email-field">
                                <input
                                    type="email"
                                    className="email-form-field"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                            />
                            </div>
                        </div>

                        <div className="button-container">
                            <button className="forgotten-password-button" onClick={handleButton}>
                            SUBMIT
                            </button>
                        </div>

                        <Link className="link"to='/login'> Back to login </Link>
                    </div>
                </div> 
        </div>   
    )    
}

export default FotgottenPasswordPage;
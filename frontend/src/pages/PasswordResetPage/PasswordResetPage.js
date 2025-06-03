import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import './PasswordResetPage.css';


const PasswordResetPage = () => {
    const { email, code } = useParams();
    const [newPassword, setNewPassword] = useState("");   
    
    const handleButton = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/resetforgottenpassword', {
                method: "POST",  
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code, newPassword }),
                }            
            );
            const text = await response.text();
            if (response.ok) {
                alert("Password changed succesfully. You can now log in.")
            }
            else {
                if (text) alert(text);
                else if (newPassword==="") alert("Please enter the password.")
                else alert("An error occured.")
            }
        } catch (error) {
            alert("Invalid request.")
            console.error("Error:", error);
            console.log(email, code, newPassword)
        }
    }

    return (
        <div className="page-container">
            <NavBar showButtons={false} />
                <div className="background-container slide-in">
                    <div className="form-container">
                            <div className="form-title ">
                                Reset Password
                            </div>
                            <div className="form-description">Please enter your new password to reset your account.</div>
                                <input
                                    type="password"
                                    className="password-form-field"
                                    placeholder="Enter your password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                            />

                        <div className="button-container">
                            <button className="forgotten-password-button" onClick={handleButton}>
                            SUBMIT
                            </button>
                        </div>
                            <Link  className="link"to='/login'> Go to login </Link>
                    </div>
                </div> 
        </div>   
    )    
}

export default PasswordResetPage;